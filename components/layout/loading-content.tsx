import { Spinner } from "../ui/spinner";

const LoadingContent = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col gap-2">
      <Spinner className="size-6" />
      <p className="text-black text-center text-sm animate-pulse">
        Loading Content...
      </p>
    </div>
  );
};

export default LoadingContent;
