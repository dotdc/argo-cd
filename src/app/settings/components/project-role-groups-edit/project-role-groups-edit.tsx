import { FormField } from 'argo-ui';
import * as React from 'react';
import * as ReactForm from 'react-form';
import { Form, Text } from 'react-form';

import { DataLoader } from '../../../shared/components';
import { services } from '../../../shared/services';

interface ProjectRoleGroupsProps {
    projName: string;
    roleName: string;
    groups: string[];
    formApi: ReactForm.FormApi;
    newRole: boolean;
}

export const ProjectRoleGroupsEdit = (props: ProjectRoleGroupsProps) => (
    <DataLoader load={() => services.applications.list([props.projName])} ref={(loader) => this.loader = loader}>
    {(applications) => (
        <React.Fragment>
            <h4>Groups</h4>
            {(
                <div className='argo-table-list'>
                    <div className='argo-table-list__row'>
                    {props.groups.map((groupName, i) => (
                            <Group key={i} field={['groups', i]}
                                formApi={props.formApi}
                                projName={props.projName}
                                roleName={props.roleName}
                                groupName={groupName}
                                deleteGroup={() => props.formApi.setValue('groups', removeEl(props.groups, i))}
                            />
                            ))}
                    </div>
                </div>
            )}

            <Form>
                {(api) => (
                    <form onSubmit={api.submitForm} role='form' className='width-control'>
                        <div className='argo-table-list'>
                            <div className='argo-table-list__row'>
                                <div className='row'>
                                    <div className='columns small-9'>
                                    <FormField formApi={api} label='' field='groupName' component={Text}/>
                                    </div>
                                    <div className='columns small-3'>
                                    <a onClick={() => {
                                        props.formApi.setValue('groups', (props.formApi.values.groups || []).concat(api.values.groupName));
                                        api.values.groupName = '';
                                    }}>Add group</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Form>
        </React.Fragment>
    )}
    </DataLoader>
);

interface GroupProps {
    projName: string;
    roleName: string;
    groupName: string;
    fieldApi: ReactForm.FieldApi;
    deleteGroup: () => void;
}

function removeEl(items: any[], index: number) {
    items.splice(index, 1);
    return items;
}

class GroupWrapper extends React.Component<GroupProps, any> {

    public render() {
        return (
            <div className='row'>
                <div className='columns small-4'>
                    {this.props.groupName}
                </div>
                <div className='columns small-1'>
                    <i className='fa fa-times' onClick={() => this.props.deleteGroup()} style={{cursor: 'pointer'}}/>
                </div>
            </div>
        );
    }
}

const Group = ReactForm.FormField(GroupWrapper);
