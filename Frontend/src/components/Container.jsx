const Container = ({ children }) => {
  return (
    <div className="flex w-full items-center justify-between gap-8 p-8">
      {children}
    </div>
  );
};

export default Container;
