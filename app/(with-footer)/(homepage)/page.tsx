import Content from "./_components/content";

const Page = async () => {
  // const res = await fetch("/api/timer/current");
  // const { data } = await res.json();

  return (
    <section className="pt-5 pb-15 h-full px-5">
      <Content />
    </section>
  );
};

export default Page;
