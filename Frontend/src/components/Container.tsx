type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const Container = (ContainerProps:ContainerProps) => {
  return (
    <div className={`flex w-full items-center justify-between gap-8 p-8  ${ContainerProps.className}`}>
      {ContainerProps.children}
    </div>
  );
};

export default Container;
