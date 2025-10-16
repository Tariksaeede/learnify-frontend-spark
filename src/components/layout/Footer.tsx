export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-lg font-bold">Learnify</div>
            <p className="text-sm text-muted-foreground mt-1">
              Discover live & recorded tech courses
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Frontend MVP • Replace mock data with API calls when backend is ready</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
