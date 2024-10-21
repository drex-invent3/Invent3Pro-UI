import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import TaskFormModal from '~/lib/components/TaskManagement/Modals/TaskFormModal';
import GenericPopover from '~/lib/components/UI/GenericPopover';
import GenericDeleteModal from '~/lib/components/UI/Modal/GenericDeleteModal';
import useCustomMutation from '~/lib/hooks/mutation.hook';
import { Task, taskFormDetails } from '~/lib/interfaces/task.interfaces';
import { useDeleteTaskMutation } from '~/lib/redux/services/task/general.services';
import { dateFormatter } from '~/lib/utils/Formatters';

const PopoverAction = (task: Task) => {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const { handleSubmit } = useCustomMutation();
  const [deleteTask, { isLoading }] = useDeleteTaskMutation({});
  const { data } = useSession();

  const handleDeleteTask = async () => {
    const response = await handleSubmit(
      deleteTask,
      { id: task?.taskId, deletedBy: data?.user.username },
      'Task Deleted Successfully'
    );
    if (response?.data) {
      onCloseDelete();
    }
  };

  return (
    <>
      <GenericPopover width="129px" placement="bottom">
        <VStack width="full" alignItems="flex-start" spacing="16px">
          <Text cursor="pointer" onClick={onOpenEdit}>
            Edit
          </Text>
          <Text cursor="pointer" onClick={onOpenDelete}>
            Delete
          </Text>
        </VStack>
      </GenericPopover>
      <TaskFormModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        data={
          {
            ...task,
            priorityId: task.taskPriorityId,
            dueDate: dateFormatter(task.dueDate, 'DD / MM / YYYY'),
            dateCompleted: dateFormatter(task.dateCompleted, 'DD / MM / YYYY'),
          } as unknown as taskFormDetails
        }
        scheduleId={task.scheduleId}
      />
      {isOpenDelete && (
        <GenericDeleteModal
          isLoading={isLoading}
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          handleDelete={handleDeleteTask}
        />
      )}
    </>
  );
};

export default PopoverAction;
