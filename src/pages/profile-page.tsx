import { $profile, $profilePagePanding } from "@/features/profile/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Logo } from "@/shared/ui/logo";
import { Skeleton } from "@/shared/ui/skeleton";
import { useUnit } from "effector-react";

export const ProfilePage = () => {
  const profile = useUnit($profile);
  const pageIsLoading = useUnit($profilePagePanding);

  return (
    <>
      <header className="flex justify-between container mx-auto py-3">
        <Logo />
        <div className="flex justify-center items-center gap-2">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="w-5xl py-10 mx-auto space-y-32">
        <div className="flex gap-10 items-center">
          <Avatar className="size-36">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-6">
            <div>
              {pageIsLoading ? (
                <Skeleton className="h-8 w-[250px]" />
              ) : (
                <p className="font-bold text-2xl">{profile?.username}</p>
              )}

              <p className="text-neutral-300">{profile?.bio}</p>
            </div>
            <div className="flex gap-5">
              <p className="flex gap-2">
                {pageIsLoading ? (
                  <Skeleton className="h-[21px] w-[9px]" />
                ) : (
                  <span className="font-bold">{profile?.stats.posts}</span>
                )}{" "}
                публикаций
              </p>
              <p className="flex gap-2">
                {pageIsLoading ? (
                  <Skeleton className="h-[21px] w-[9px]" />
                ) : (
                  <span className="font-bold">{profile?.stats.following}</span>
                )}
                подписок
              </p>
              <p className="flex gap-2">
                {pageIsLoading ? (
                  <Skeleton className="h-[21px] w-[9px]" />
                ) : (
                  <span className="font-bold">{profile?.stats.followers}</span>
                )}
                подписчиков
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
          <Photo />
        </div>
      </main>
    </>
  );
};

const Photo = () => {
  return <div className="bg-white/50 aspect-square w-full"></div>;
};
