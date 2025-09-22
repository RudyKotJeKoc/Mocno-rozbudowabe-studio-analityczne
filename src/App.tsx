import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Layout } from './components/Layout';
import CategoryPage from './pages/Category';
import ArticlePage from './pages/Article';
import IntegrityPage from './pages/Integrity';

const queryClient = new QueryClient();

function StaticPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="prose prose-neutral max-w-none">{children}</div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/integrity" element={<IntegrityPage />} />
            <Route
              path="/privacy"
              element={
                <StaticPage title="Prywatność i cookies (PL)">
                  <p>Brak trackerów i ciasteczek analitycznych. Preferencje audio mogą być zapisane po zgodzie.</p>
                </StaticPage>
              }
            />
            <Route
              path="/corrections"
              element={
                <StaticPage title="Sprostowania / Right of Reply">
                  <p>Procedura sprostowań dostępna e-mailem. Publikacja sprostowań bez komentarza tego samego dnia online.</p>
                </StaticPage>
              }
            />
            <Route
              path="/editorial"
              element={
                <StaticPage title="Standardy redakcyjne">
                  <p>Styl poważny, analityczny. Oznaczanie treści wrażliwych, brak zbędnych animacji. Ikony zawsze z etykietami.</p>
                </StaticPage>
              }
            />
            <Route
              path="/methodology"
              element={
                <StaticPage title="Metodologia i Pochodzenie">
                  <p>Oryginały write-once. Publiczne retusze prawne są oznaczone i nigdy nie zastępują kanonicznego pliku.</p>
                </StaticPage>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;