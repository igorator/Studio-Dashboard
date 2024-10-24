import type { FormProps } from 'antd';
import { Button, Switch, Form, Input, Flex, App } from 'antd';
import { CoverUpload } from '../Uploads/CoverUpload';
import {
  useAddTeamMemberMutation,
  useEditTeamMemberMutation,
} from '../../redux/services/teamApi';
import { routes } from '../../data/routes-config';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type TeamMemberBaseType = {
  name_eng: string;
  job_title_eng: string;
  name_ua: string;
  job_title_ua: string;
  isOnSite: boolean;
};

type TeamMemberFieldType = TeamMemberBaseType & {
  photo: File | null;
};

// Тип для записи команды
type TeamMemberEntryDataType = TeamMemberBaseType & {
  id: number;
  photo_id: number | null;
};

const onFinishFailed: FormProps<TeamMemberFieldType>['onFinishFailed'] = (
  errorInfo,
) => {
  console.log('Failed:', errorInfo);
};

export const TeamForm = ({
  teamMember,
}: {
  teamMember?: TeamMemberEntryDataType;
}) => {
  const { message } = App.useApp();
  const [addTeamMember] = useAddTeamMemberMutation();
  const [editTeamMember] = useEditTeamMemberMutation();
  const [isDirty, setIsDirty] = useState(false);

  const onFinish: FormProps<TeamMemberFieldType>['onFinish'] = async (
    formData,
  ) => {
    try {
      const formDataToSend = new FormData();

      // Adding text data
      formDataToSend.append('name_eng', formData.name_eng);
      formDataToSend.append('job_title_eng', formData.job_title_eng);
      formDataToSend.append('name_ua', formData.name_ua);
      formDataToSend.append('job_title_ua', formData.job_title_ua);

      // Adding photo file
      if (formData.photo instanceof File) {
        formDataToSend.append('photo', formData.photo);
      }

      // Adding boolean data
      formDataToSend.append('isOnSite', formData.isOnSite.toString());

      if (teamMember) {
        // Editing an existing team member
        const response = await editTeamMember({
          id: teamMember.id,
          updates: formDataToSend,
        });
        console.log('Edited team member:', response);
        message.success('Team member updated');
      } else {
        // Adding a new team member
        const response = await addTeamMember(formDataToSend);
        message.success('Team member created');
        console.log('New team member created:', response);
      }

      setIsDirty(false); // Reset isDirty after successful submission
    } catch (error) {
      console.error('Error creating or editing team member:', error);
    }
  };

  const initialValues = teamMember
    ? {
        name_eng: teamMember.name_eng,
        job_title_eng: teamMember.job_title_eng,
        name_ua: teamMember.name_ua,
        job_title_ua: teamMember.job_title_ua,
        photo: teamMember.photo_id,
        isOnSite: teamMember.isOnSite || false,
      }
    : {
        name_eng: null,
        job_title_eng: null,
        name_ua: null,
        job_title_ua: null,
        photo: null,
        isOnSite: false,
      };

  const handleChange = () => {
    setIsDirty(true);
  };

  return (
    <Form
      name='team-form'
      layout='vertical'
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      onValuesChange={handleChange} // Tracking changes in form
    >
      <Flex vertical gap={16}>
        <Form.Item
          label='Team Member Photo'
          name={'photo'}
          getValueFromEvent={(e) => e}
        >
          <CoverUpload
            initialCoverId={teamMember ? teamMember.photo_id : null}
          />
        </Form.Item>
        <Form.Item<TeamMemberFieldType>
          label='Name (EN)'
          name={'name_eng'}
          rules={[{ required: true, message: 'Please enter name in English' }]}
        >
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item<TeamMemberFieldType>
          label='Job Title (EN)'
          name={'job_title_eng'}
          rules={[
            { required: true, message: 'Please enter job title in English' },
          ]}
        >
          <Input placeholder='Job Title' />
        </Form.Item>
        <Form.Item<TeamMemberFieldType>
          label='Name (UA)'
          name={'name_ua'}
          rules={[
            { required: true, message: 'Please enter name in Ukrainian' },
          ]}
        >
          <Input placeholder='Name' />
        </Form.Item>
        <Form.Item<TeamMemberFieldType>
          label='Job Title (UA)'
          name={'job_title_ua'}
          rules={[
            { required: true, message: 'Please enter job title in Ukrainian' },
          ]}
        >
          <Input placeholder='Job Title' />
        </Form.Item>

        <Form.Item<TeamMemberFieldType>
          valuePropName='checked'
          label='Show on site'
          name={'isOnSite'}
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Flex gap={26} align='center'>
            <Button type='primary' htmlType='submit' disabled={!isDirty}>
              {teamMember ? 'Update' : 'Create'}
            </Button>

            <Button type='link'>
              <Link to={routes.team.path}>Back</Link>
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};
