import { AdminHeader, AdminSideBar } from "./components";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={16} className="border-r">
        <div className="h-screen">
          <AdminSideBar />
        </div>
      </ResizablePanel>
      <ResizableHandle className="hidden" />
      <ResizablePanel defaultSize={84}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={8} className="border-b">
            <div className="h-full">
              <AdminHeader />
            </div>
          </ResizablePanel>
          <ResizableHandle className="hidden" />
          <ResizablePanel defaultSize={92}>
            <ScrollArea className="h-full p-2">{children}</ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
