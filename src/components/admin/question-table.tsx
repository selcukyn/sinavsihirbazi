'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Question } from '@/lib/types';
import { QuestionForm } from './question-form';
import {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from '@/lib/services/questions.service';
import { useToast } from '@/hooks/use-toast';

const getSubjectName = (subject: string) => {
  if (subject === 'mathematics') return 'Matematik';
  if (subject === 'turkish') return 'Türkçe';
  if (subject === 'ales') return 'ALES';
  return 'Diğer';
};

const getBadgeVariant = (subject: string) => {
  if (subject === 'mathematics') return 'default';
  if (subject === 'turkish') return 'secondary';
  if (subject === 'ales') return 'destructive';
  return 'outline';
};

export function QuestionTable() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(
    null
  );
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast({
          variant: 'destructive',
          title: 'Hata!',
          description:
            'Sorular yüklenirken bir hata oluştu. Lütfen Firestore veritabanını etkinleştirdiğinizden emin olun.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [toast]);

  const handleAddNew = () => {
    setEditingQuestion(null);
    setIsFormOpen(true);
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setIsFormOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deletingQuestionId) {
      try {
        await deleteQuestion(deletingQuestionId);
        setQuestions(questions.filter((q) => q.id !== deletingQuestionId));
        toast({
          title: 'Başarılı!',
          description: 'Soru başarıyla silindi.',
        });
      } catch (error) {
        console.error('Error deleting question:', error);
        toast({
          variant: 'destructive',
          title: 'Hata!',
          description: 'Soru silinirken bir hata oluştu.',
        });
      } finally {
        setDeletingQuestionId(null);
      }
    }
  };

  const handleSave = async (savedQuestion: Question) => {
    try {
      if (editingQuestion && savedQuestion.id) {
        // Update existing question
        const updatedData = { ...savedQuestion };
        await updateQuestion(savedQuestion.id, updatedData);
        setQuestions(
          questions.map((q) => (q.id === savedQuestion.id ? updatedData : q))
        );
        toast({
          title: 'Başarılı!',
          description: 'Soru başarıyla güncellendi.',
        });
      } else {
        // Add new question
        const { id, ...newQuestionData } = savedQuestion;
        const newId = await addQuestion(newQuestionData);
        // We fetch the questions again to get the server-generated timestamp
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
        toast({
          title: 'Başarılı!',
          description: 'Yeni soru başarıyla eklendi.',
        });
      }
    } catch (error) {
      console.error('Error saving question:', error);
      toast({
        variant: 'destructive',
        title: 'Hata!',
        description: 'Soru kaydedilirken bir hata oluştu.',
      });
    } finally {
      setIsFormOpen(false);
      setEditingQuestion(null);
    }
  };

  if (loading) {
    return <div>Sorular yükleniyor...</div>;
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Yeni Soru Ekle
        </Button>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Soru Metni</TableHead>
              <TableHead className="hidden md:table-cell">Ders</TableHead>
              <TableHead>
                <span className="sr-only">Eylemler</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.map((question, index) => (
              <TableRow key={`${question.id}-${index}`}>
                <TableCell className="font-medium max-w-sm lg:max-w-md xl:max-w-xl truncate">
                  {question.question || question.text}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={getBadgeVariant(question.subject)}
                    className={
                      question.subject === 'mathematics' ? 'bg-primary' : ''
                    }
                  >
                    {getSubjectName(question.subject)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menüyü aç</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(question)}>
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingQuestionId(question.id)}
                        className="text-red-500 focus:text-red-500"
                      >
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <QuestionForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        question={editingQuestion}
        onSave={handleSave}
      />

      <AlertDialog
        open={!!deletingQuestionId}
        onOpenChange={(open) => !open && setDeletingQuestionId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu eylem geri alınamaz. Bu soru kalıcı olarak veritabanından
              silinecektir.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingQuestionId(null)}>
              İptal
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
