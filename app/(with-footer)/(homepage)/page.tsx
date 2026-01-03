import Content from "./_components/content";

const Page = async () => {
  const res = await fetch(`${process.env.APP_URL}/api/timer/current`, {
    next: {
      revalidate: 60,
    },
  });
  const { data } = await res.json();
  console.log(data);

  return (
    <section className="pt-5 pb-15 h-full px-5">
      <Content />
    </section>
  );
};

export default Page;
