import PageTitleBack from "@/components/share/page-title-back";
import Content from "./_components/content";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <PageTitleBack title="Request Vacation" className="px-0" customLink="/" />
      <Content />
    </section>
  );
};

export default Page;
