"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Question } from '@/lib/types';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  id: z.string().optional(),
  subject: z.enum(['turkish', 'mathematics', 'ales'], {
    required_error: "Ders alanı zorunludur.",
  }),
  question: z.string().min(10, "Soru metni en az 10 karakter olmalıdır."),
  options: z.array(z.object({
    id: z.string(),
    text: z.string().min(1, "Seçenek boş olamaz."),
  })).length(5, "Tam olarak 5 seçenek olmalıdır."),
  correctOptionId: z.string({ required_error: "Doğru şıkkı seçmelisiniz." }),
});

type QuestionFormValues = z.infer<typeof formSchema>;

interface QuestionFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  question: Question | null;
  onSave: (question: Question) => void;
}

export function QuestionForm({ isOpen, onOpenChange, question, onSave }: QuestionFormProps) {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: 'turkish',
      question: '',
      options: [
        { id: 'a', text: '' },
        { id: 'b', text: '' },
        { id: 'c', text: '' },
        { id: 'd', text: '' },
        { id: 'e', text: '' },
      ],
    },
  });
  
  useEffect(() => {
    if (question) {
      form.reset({
        id: question.id,
        subject: question.subject,
        question: question.question,
        options: question.options.map(opt => ({ id: opt.id, text: opt.text })).sort((a,b) => a.id.localeCompare(b.id)),
        correctOptionId: question.correctOptionId
      });
    } else {
      form.reset({
        subject: 'turkish',
        question: '',
        options: [
            { id: 'a', text: '' },
            { id: 'b', text: '' },
            { id: 'c', text: '' },
            { id: 'd', text: '' },
            { id: 'e', text: '' },
        ],
        correctOptionId: undefined,
      });
    }
  }, [question, form]);


  const onSubmit = (data: QuestionFormValues) => {
    // ID is now handled by the service, so we don't need a temporary one
    onSave(data as Question);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{question ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}</DialogTitle>
          <DialogDescription>
            Soru bilgilerini buradan ekleyebilir veya düzenleyebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ders</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Bir ders seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="turkish">Türkçe</SelectItem>
                          <SelectItem value="mathematics">Matematik</SelectItem>
                          <SelectItem value="ales">ALES</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soru Metni</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Soru metnini buraya yazın..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="correctOptionId"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Seçenekler ve Doğru Şık</FormLabel>
                  <FormControl>
                     <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                      {form.getValues('options').map((option, index) => (
                        <FormField
                            key={option.id}
                            control={form.control}
                            name={`options.${index}.text`}
                            render={({ field: optionField }) => (
                                <FormItem>
                                <FormControl>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                                        <div className="flex-1 flex items-center gap-2">
                                            <span className="font-bold">{option.id.toUpperCase()})</span>
                                            <Input {...optionField} placeholder={`Seçenek ${option.id.toUpperCase()}`} />
                                        </div>
                                    </div>
                                </FormControl>
                                </FormItem>
                            )}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>İptal</Button>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
