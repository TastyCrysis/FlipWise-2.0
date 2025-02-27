import { useRouter } from "next/router";

export default function NavigationHandler({ selectedCollections }) {
  const router = useRouter();

  const handleNavigate = () => {
    if (selectedCollections.length === 1) {
      router.push(`/collections/${selectedCollections[0]}/archive`);
    } else if (selectedCollections.length > 1) {
      const queryString = selectedCollections.join(",");
      router.push(`/collections/selected-archives?ids=${queryString}`);
    }
  };

  return { handleNavigate };
}
