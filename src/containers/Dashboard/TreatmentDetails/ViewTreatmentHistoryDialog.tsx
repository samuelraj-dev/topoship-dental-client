import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { History } from 'lucide-react';

export function ViewTreatmentHistoryDialog()
{
  return (
    <Dialog>
      <DialogTrigger asChild>
        <History height={"15px"} width={"15px"} className='cursor-pointer' />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            
          </DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}