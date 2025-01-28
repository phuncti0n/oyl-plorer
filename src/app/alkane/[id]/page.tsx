import AlkaneDetails from "../../components/AlkaneDetails";

export default function AlkaneById() {
  const id = "2";

  return (
    <main className="mx-auto w-full max-w-7xl flex-grow p-8">
      <AlkaneDetails id={id} />
    </main>
  );
}
