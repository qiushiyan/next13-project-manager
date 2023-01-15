import Card from "@components/ui/Card";
import Spinner from "@components/ui/Spinner";

export default function HomePageLoader() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card>
        <Spinner />
      </Card>
    </div>
  );
}
