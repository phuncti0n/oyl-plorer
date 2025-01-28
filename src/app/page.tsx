import GalleryPreview from "./components/GalleryPreview";
import SearchInput from "./components/SearchInput";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-8xl flex-col items-center justify-between space-y-6 p-6">
      <div className="w-full">
        <p className="mt-10 text-center text-xl uppercase">Alkanes</p>
        <SearchInput />
        <GalleryPreview />
      </div>
    </main>
  );
}
