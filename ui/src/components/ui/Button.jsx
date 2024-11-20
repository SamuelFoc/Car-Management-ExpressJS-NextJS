export default function Button({ children, onClick, width }) {
  return (
    <div className={`${width ? width : "w-full"} flex justify-center p-4`}>
      <button
        onClick={onClick}
        className="w-full max-w-52 bg-secondary text-primary font-black py-2 rounded hover:bg-primary-dark"
      >
        {children}
      </button>
    </div>
  );
}
