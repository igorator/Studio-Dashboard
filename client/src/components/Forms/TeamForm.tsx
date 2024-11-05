import type { FormProps } from 'antd';
import { Button, Switch, Form, Input, Flex, App } from 'antd';
import { CoverUpload } from '../Uploads/CoverUpload';
import {
  useAddTeamMemberMutation,
  useEditTeamMemberMutation,
} from '../../redux/services/teamApi';
import { routes } from '../../data/routes-config';
import { Link, useNavigate } from 'react-router-dom';
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

type TeamMemberEntryDataType = TeamMemberBaseType & {
  id: number;
  photo_id: number | null;
};

export const TeamForm = ({
  teamMember,
  refetchTeamMember,
}: {
  teamMember?: TeamMemberEntryDataType;
  refetchTeamMember?: () => void;
}) => {
  const { message } = App.useApp();
  const [addTeamMember] = useAddTeamMemberMutation();
  const [editTeamMember] = useEditTeamMemberMutation();
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const onFinishFailed: FormProps<TeamMemberFieldType>['onFinishFailed'] =
    () => {
      message.error('Please fill in all required fields correctly');
    };

  const onFinish: FormProps<TeamMemberFieldType>['onFinish'] = async (
    formData,
  ) => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('name_eng', formData.name_eng);
      formDataToSend.append('job_title_eng', formData.job_title_eng);
      formDataToSend.append('name_ua', formData.name_ua);
      formDataToSend.append('job_title_ua', formData.job_title_ua);

      if (formData.photo instanceof File) {
        formDataToSend.append('photo', formData.photo);
      }

      formDataToSend.append('isOnSite', formData.isOnSite.toString());

      if (teamMember) {
        await editTeamMember({
          id: teamMember.id,
          updates: formDataToSend,
        });

        message.success('Team member updated');
        refetchTeamMember && refetchTeamMember();
      } else {
        await addTeamMember(formDataToSend);
        navigate(routes.team.path);
        message.success('Team member created');
      }

      setIsDirty(false);
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
      onValuesChange={handleChange}
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
