import CurrentLayout from "../../core/components/CurrentLayout";
import PostsList from "./PostsList";

export default function Profile() {
  return (
    <CurrentLayout className="MyAdventures">
      <PostsList />
    </CurrentLayout>
  );
}
