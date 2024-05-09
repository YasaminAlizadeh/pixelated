import CanvasSizeForm from "./CanvasSizeForm";

const LeftPane = () => {
  return (
    <section>
      <header className="col-span-3">
        <h1 className="font-pixelify text-4xl bg-gradient-to-br from-accent--orange to-accent--pink w-fit text-transparent bg-clip-text mb-4">
          Pixelated
        </h1>
      </header>
      <CanvasSizeForm />
    </section>
  );
};

export default LeftPane;
