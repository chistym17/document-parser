import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="h-screen">
        <Hero />
      </section>
      <section className="h-screen bg-gray-50">
        <FileUpload />
      </section>
    </main>
  );
}
