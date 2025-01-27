import AlkaneDetails from "../../components/AlkaneDetails";

const AlkaneById = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  return (
    <main className="mx-auto w-full max-w-7xl flex-grow p-8">
      <AlkaneDetails id={id} />
    </main>
  );
};

export default AlkaneById;
