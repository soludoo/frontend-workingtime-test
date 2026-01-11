import BackAdmin from "@/components/share/back-admin";
import PageTitleAdmin from "@/components/share/page-title-admin";
import { Button } from "@/components/ui/button";
import PhotoBackground from "./photo-background";
import Information from "./information";

const Content = () => {
  return (
    <section className="flex flex-col gap-8 pb-28">
      <BackAdmin />
      <PageTitleAdmin title="Employee Detail" />
      <PhotoBackground />
      <Information />
      <div className="fixed bg-white w-full h-20 border-t border-border bottom-0 flex items-center justify-end right-0 z-0 px-8">
        <Button variant={"admin"} className="w-fit" size={"lg"}>
          Edit Employee
        </Button>
      </div>
    </section>
  );
};

export default Content;
