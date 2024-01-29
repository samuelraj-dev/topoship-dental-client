{/* input */}
<Input
className="outline-none w-[15rem]"
placeholder="filter patients"
value={table.getColumn("PatName")?.getFilterValue() as string || ""}
onChange={(e) => {
  table.getColumn("PatName")?.setFilterValue(e.target.value)
}}
/>
{/* add patient */}
<AddPatientDialog />
{/* download to excel */}
<Button
variant="outline"
onClick={() => downloadToExcel()}
className="px-[0.4rem] ml-[0.2rem]"
>
<Download />
</Button>
{/* filter columns */}
<DropdownMenu>
<DropdownMenuTrigger>
  <Button
    variant="outline"
    className="px-[0.4rem] ml-[0.2rem]"
  ><Columns /></Button>
</DropdownMenuTrigger>
<DropdownMenuContent align="end">
  {table.getAllColumns().filter(column => column.getCanHide()).map(column => {
    return (
      <DropdownMenuCheckboxItem
        key={column.id}
        className="capitalize"
        checked={column.getIsVisible()}
        onCheckedChange={(value: boolean) => {
          column.toggleVisibility(!!value)
        }}
      >
        {column.id}
      </DropdownMenuCheckboxItem>
    )
  })}
</DropdownMenuContent>
</DropdownMenu>
</div>










<div className="flex justify-between items-center">
        <div className=" text-sm text-muted-foreground py-[0.2rem]">
          {table.getFilteredSelectedRowModel().rows.length} of {` `}
          {table.getFilteredRowModel().rows.length} rows selected
        </div>
        <div className="flex items-center justify-start space-x-2 py-[0.2rem]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          ><ChevronLeft /></Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          ><ChevronRight /></Button>
        </div>
      </div>


























const { toast } = useToast()
      const setPatients = useSetRecoilState(patientsState);
      const deleteBtnRef = useRef(null);

      const deletePatient = async () => {

        try {
          // updating button text to "saving"
          const element: any = deleteBtnRef.current;
          if (element) {
            element.innerText = 'Deleting...';
            element.disabled = true;
          }
          
          // updating database
          await fetch(`https://api.topoship.com/patients`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: patientDetails.PatID
            })
          })
      
          // informing user
          toast({
            description: `Deleted the details of ${patientDetails.PatName}`,
          })

          // updating table
          const getPatientsResponse = await fetch("https://api.topoship.com/patients");
          setPatients(await getPatientsResponse.json())
      
          // updating button text to "done"
          element.innerText = 'Done';
      
        } catch (error) {
          console.log(error);
        }
      }

      return (
        <Dialog>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* Edit Trigger */}
              <DialogTrigger asChild>
                <DropdownMenuItem>                 
                    Edit
                </DropdownMenuItem>
              </DialogTrigger>

              {/* Delete Trigger */}
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>                 
                  <span className="text-[#dc2626] hover:text-[#dc2626]">Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>

            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Edit Dialog */}          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patient Name: {patientDetails.PatName}</DialogTitle>
              <DialogDescription>Patient ID: {patientDetails.PatID}</DialogDescription>
            </DialogHeader>
            <DialogForm patientDetails={patientDetails} />            
          </DialogContent>

          {/* Delete Dialog */}  
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {`This action cannot be undone. This will permanently remove ${patientDetails.PatName} data from our servers.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction ref={deleteBtnRef} onClick={deletePatient}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

        </AlertDialog>
        </Dialog>
      )
    }