'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useRef, useState, useTransition } from 'react';
import { addUserAction, updateUserAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getUsers, updateUser } from '@/lib/services/user.service';
import type { User } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function AddUserSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Kullanıcı Ekleniyor...' : 'Yeni Kullanıcı Ekle'}
    </Button>
  );
}

function UpdateUserSubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
        </Button>
    )
}

export function UserManagement() {
  const [addState, addFormAction] = useActionState(addUserAction, null);
  const [updateState, updateFormAction] = useActionState(updateUserAction, null);

  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const updateFormRef = useRef<HTMLFormElement>(null);
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isPending, startTransition] = useTransition();


  const fetchUsers = async () => {
    setLoading(true);
    const fetchedUsers = await getUsers();
    setUsers(fetchedUsers);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (addState?.success) {
      toast({
        title: 'Başarılı!',
        description: addState.message,
      });
      formRef.current?.reset();
      fetchUsers(); // Refresh the user list
    } else if (addState?.error) {
      toast({
        variant: 'destructive',
        title: 'Hata!',
        description: addState.error,
      });
    }
  }, [addState, toast]);

    useEffect(() => {
    if (updateState?.success) {
      toast({
        title: 'Başarılı!',
        description: updateState.message,
      });
      setIsUpdateDialogOpen(false);
      setEditingUser(null);
      fetchUsers(); // Refresh the user list
    } else if (updateState?.error) {
      toast({
        variant: 'destructive',
        title: 'Hata!',
        description: updateState.error,
      });
    }
  }, [updateState, toast]);

  const handleSoftDelete = () => {
    if (!deletingUser) return;

    startTransition(async () => {
        try {
            await updateUser(deletingUser.id!, { status: 'passive' });
            toast({
                title: 'Başarılı!',
                description: `Kullanıcı '${deletingUser.username}' başarıyla silindi (pasife alındı).`
            });
            fetchUsers(); // Refresh the list
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Hata!',
                description: 'Kullanıcı silinirken bir hata oluştu.'
            });
        } finally {
            setDeletingUser(null);
        }
    });
  }

  return (
    <>
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Yeni Kullanıcı Ekle</CardTitle>
          <CardDescription>
            Yeni bir admin veya öğrenci hesabı oluşturun.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={addFormAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select name="role" required defaultValue="ogrenci">
                <SelectTrigger id="role">
                  <SelectValue placeholder="Bir rol seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ogrenci">Öğrenci</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AddUserSubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Mevcut Kullanıcılar</CardTitle>
          <CardDescription>Sistemdeki mevcut aktif kullanıcıların listesi.</CardDescription>
        </CardHeader>
        <CardContent>
            {loading ? (
                <p>Kullanıcılar yükleniyor...</p>
            ) : (
                <div className="rounded-lg border bg-card max-h-96 overflow-y-auto">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Kullanıcı Adı</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead><span className="sr-only">Eylemler</span></TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>
                                    <Badge variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Menüyü aç</span>
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                                        <DropdownMenuItem onClick={() => { setEditingUser(user); setIsUpdateDialogOpen(true); }}>
                                            Düzenle
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setDeletingUser(user)}
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
            )}
        </CardContent>
      </Card>
    </div>

    {/* Update User Dialog */}
    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Kullanıcıyı Düzenle</DialogTitle>
                <DialogDescription>
                    Kullanıcı '{editingUser?.username}' bilgilerini güncelleyin. Şifre alanını boş bırakmak mevcut şifreyi korur.
                </DialogDescription>
            </DialogHeader>
            <form ref={updateFormRef} action={updateFormAction} className="space-y-4">
                 <input type="hidden" name="id" value={editingUser?.id || ''} />
                 <div className="space-y-2">
                    <Label htmlFor="update-role">Rol</Label>
                    <Select name="role" required defaultValue={editingUser?.role}>
                        <SelectTrigger id="update-role">
                        <SelectValue placeholder="Bir rol seçin" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="ogrenci">Öğrenci</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="update-password">Yeni Şifre (İsteğe Bağlı)</Label>
                    <Input id="update-password" name="password" type="password" placeholder="Yeni şifre girin" />
                 </div>
                 <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsUpdateDialogOpen(false)}>İptal</Button>
                    <UpdateUserSubmitButton />
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>


    {/* Delete Confirmation Dialog */}
    <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
                Bu eylem geri alınamaz. Kullanıcı '{deletingUser?.username}' pasife alınacak ve sisteme giriş yapamayacaktır.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingUser(null)}>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={handleSoftDelete} disabled={isPending}>
                {isPending ? "Siliniyor..." : "Sil"}
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    </>
  );
}
