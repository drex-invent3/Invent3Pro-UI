'use client';
import { notFound } from 'next/navigation';
import RoleDetails from '~/lib/components/RoleManagement/RoleDetails';
import PageLoadingSkeleton from '~/lib/components/UI/PageLoadingSkeleton';
import { RoleModulePermission } from '~/lib/interfaces/role.interfaces';
import { useAppDispatch } from '~/lib/redux/hooks';

import {
  useGetAllRoleSystemModuleContextPermissionsQuery,
  useGetRoleByIdQuery,
} from '~/lib/redux/services/role.services';
import { setInitialOptions } from '~/lib/redux/slices/RoleSlice';

export default function Page({ params }: { params: { id: number } }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetRoleByIdQuery({ id: params.id! });
  const { data: rolePermissions, isLoading: isLoadingPermissions } =
    useGetAllRoleSystemModuleContextPermissionsQuery(
      { roleIds: [params.id], pageSize: 100 },
      { skip: !data?.data.roleId }
    );

  if (isLoading || isLoadingPermissions) {
    return <PageLoadingSkeleton />;
  }
  if (rolePermissions) {
    const transformedPermissions: RoleModulePermission[] =
      rolePermissions?.data?.items.map((item) => ({
        roleSystemModuleContextPermissionId:
          item.roleSystemModuleContextPermissionId,
        systemModuleContextTypeId: item.systemModuleContextTypeId,
        systemSubModuleContextTypeId: item.systemSubModuleContextTypeId,
      }));
    dispatch(setInitialOptions(transformedPermissions));
  }

  if (!data?.data) return notFound();

  return <RoleDetails role={data?.data} />;
}
