import { UserManagement } from '@/components/admin/user-management';
import { Users } from 'lucide-react';

export default function AdminUsersPage() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold font-headline">
          Kullanıcı Yönetimi
        </h1>
      </div>
      <p className="text-muted-foreground">
        Buradan yeni kullanıcılar (admin veya öğrenci) ekleyebilirsiniz. Mevcut kullanıcılar güvenlik nedeniyle düzenlenemez veya silinemez.
      </p>
      <div className="mt-4">
        <UserManagement />
      </div>
    </>
  );
}
