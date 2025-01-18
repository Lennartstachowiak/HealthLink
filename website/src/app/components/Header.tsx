// import { Search } from "lucide-react";
import Image from "next/image";
// import { Input } from "@/components/ui/input";
import { TestSelector } from "./TestSelector";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Result } from "@/types/results";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  result: Result;
  setResult: Dispatch<SetStateAction<Result>>;
}

export function Header(props: HeaderProps) {
  const { result, setResult } = props;
  return (
    <Card className="shadow-none top-0 left-0 right-0">
      <CardHeader className="bg-white w-full py-4">
        <div className="flex items-center justify-between ">
          <Image
            src="/healthlink.svg"
            alt="HealthLink Logo"
            width={140}
            height={32}
            className="h-8"
          />
          <div className="flex flex-row items-center gap-4">
            <TestSelector result={result} setResult={setResult} />
            <Button
              size="icon"
              className="rounded-full text-gray-900 bg-transparent shadow-none hover:bg-gray-100"
            >
              <User className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
