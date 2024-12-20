import { Header } from '../components/dashboard/Header';
import { FileUpload } from '../components/FileUpload';
import { FileList } from '../components/FileList';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Upload de Documentos</h2>
            <FileUpload />
            <div className="mt-8">
              <FileList />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}