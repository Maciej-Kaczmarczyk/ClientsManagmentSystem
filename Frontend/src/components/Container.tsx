type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};
const Container = (ContainerProps: ContainerProps) => {
  return (
    <div
      className={`flex w-full items-center justify-between gap-8 rounded-lg bg-white p-8 dark:bg-zinc-800  ${ContainerProps.className}`}
    >
      {ContainerProps.children}
    </div>
  );
};

export default Container;
