'use clinet';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import TaskTitle from './sub-components/task-title';
import TaskLabel from './sub-components/task-label';
import TaskStatus from './sub-components/task-status';
import TaskPriority from './sub-components/task-priority';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TaskFormData, taskFormSchema } from './task-dialog-schema';
import { useTasksDataStore } from '@/app/hooks/useTaskDataStore';
import { useToast } from '@/hooks/use-toast';
import { useOpenDialogStore } from '@/app/hooks/useOpenDialogStore';
import { Loader2 } from 'lucide-react';
import { Task } from '@/app/data/tasks-table';
import { generateRandomThreeDigitNumber } from '@/app/functions/generateRandomNumbers';

export default function TaskDialog() {
  const methods = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
  });

  const { addTask } = useTasksDataStore();

  const { handleSubmit, reset } = methods;

  const { toast } = useToast();

  const { isOpen, setIsOpen } = useOpenDialogStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: TaskFormData) => {
    setIsLoading(true);

    const newTask: Task = {
      taskId: `Task-${generateRandomThreeDigitNumber()}`,
      title: data.title,
      status: data.status,
      priority: data.priority,
      label: data.label,
      isFavorite: false,
      createdAt: new Date(),
    };

    try {
      const result = await addTask(newTask);
      toast({
        variant: result.success ? 'default' : 'destructive',
        title: result.success
          ? `The Task[${newTask.taskId}] Updated Successfully!`
          : 'Failed to add the task!',
        description: result.message,
      });

      reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);

      toast({
        variant: 'destructive',
        title: 'Failed to add the task!',
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add New Task</Button>
      </DialogTrigger>

      <DialogContent className="poppins max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Task</DialogTitle>
          <DialogDescription>Fill in the form to add a task</DialogDescription>
          <div className="mt-4">
            <Separator className="mt-3" />
          </div>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-8">
              <div className="grid grid-cols-2 gap-5">
                <TaskTitle />
                <TaskStatus />
              </div>
              <div className="grid grid-cols-2 gap-5 mt-6">
                <TaskPriority />
                <TaskLabel />
              </div>
            </div>

            <DialogFooter className="mb-4 mt-9">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="px-9">
                  Close
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Adding Task...</span>
                  </>
                ) : (
                  <span>Add New Task</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
