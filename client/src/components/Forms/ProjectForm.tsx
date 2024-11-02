import type { FormProps, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { App, Button, Switch, Form, Input, Flex } from 'antd';
import { CoverUpload } from '../Uploads/CoverUpload';
import { ScreensUpload } from '../Uploads/ScreensUpload';
import {
  useAddProjectMutation,
  useEditProjectMutation,
} from '../../redux/services/projectApi';
import { routes } from '../../data/routes-config';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

type ProjectBaseType = {
  title_eng: string;
  description_eng: string;
  title_ua: string;
  description_ua: string;
  social_urls: { [key: string]: string | null };
  isOnSite: boolean;
  isOnHeroSlider: boolean;
};

type ProjectFieldType = ProjectBaseType & {
  cover: File | string;
  screens: (File | string)[] | [];
};

type ProjectEntryDataType = ProjectBaseType & {
  id: number;
  cover_id: number | null;
  screens_ids: number[];
};

const projectLinksFields = [
  { label: 'Behance', name: 'behance' },
  { label: 'Dribble', name: 'dribble' },
  { label: 'Github', name: 'github' },
  { label: 'Upwork', name: 'upwork' },
];

export const ProjectForm = ({
  project,
  refetchProject,
}: {
  project?: ProjectEntryDataType;
  refetchProject?: () => void;
}) => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [addProject] = useAddProjectMutation();
  const [editProject] = useEditProjectMutation();
  const [isDirty, setIsDirty] = useState(false);

  const onFinishFailed: FormProps<ProjectFieldType>['onFinishFailed'] = (
    error,
  ) => {
    console.log(error);
    message.error('Please fill in all required fields correctly');
  };

  const onFinish: FormProps<ProjectFieldType>['onFinish'] = async (
    formData,
  ) => {
    try {
      const formDataToSend = new FormData();

      // Проверка и добавление текстовых данных
      formDataToSend.append('title_eng', formData.title_eng);
      formDataToSend.append('description_eng', formData.description_eng);
      formDataToSend.append('title_ua', formData.title_ua);
      formDataToSend.append('description_ua', formData.description_ua);

      // Добавление социальных URL
      Object.entries(formData.social_urls).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(`social_urls[${key}]`, value);
        }
      });

      // Добавление boolean данных
      formDataToSend.append('isOnSite', formData.isOnSite.toString());
      formDataToSend.append(
        'isOnHeroSlider',
        formData.isOnHeroSlider.toString(),
      );

      // Проверка, был ли изменен cover

      formDataToSend.append('cover', formData.cover);

      if (!formData.screens || formData.screens.length === 0) {
        formDataToSend.append('screens', JSON.stringify([]));
      } else {
        formData.screens.forEach((screen) =>
          formDataToSend.append('screens[]', screen),
        );
      }

      for (const pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      if (project) {
        const response = await editProject({
          id: project.id,
          updates: formDataToSend,
        });
        message.success('Project updated');
        console.log('Edited project:', response);
        setIsDirty(false);
        refetchProject && refetchProject();
      } else {
        const response = await addProject(formDataToSend);
        message.success('Project created');
        console.log('New project created:', response);
        navigate(routes.projects.path);
      }
    } catch (error) {
      message.error('Project creating / editing error');
      console.error('Error creating or editing project:', error);
    }
  };

  const initialValues = project
    ? {
        cover: project.cover_id,
        title_eng: project.title_eng,
        description_eng: project.description_eng,
        title_ua: project.title_ua,
        description_ua: project.description_ua,
        screens: project.screens_ids,
        social_urls: project.social_urls,
        isOnSite: project.isOnSite || false,
        isOnHeroSlider: project.isOnHeroSlider || false,
      }
    : {
        cover: null,
        title_eng: null,
        description_eng: null,
        title_ua: null,
        description_ua: null,
        screens: [],
        social_urls: {
          behance: null,
          dribble: null,
          github: null,
          upwork: null,
        },
        isOnSite: false,
        isOnHeroSlider: false,
      };

  return (
    <Form
      name='project-form'
      layout='vertical'
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      onValuesChange={() => setIsDirty(true)}
    >
      <Flex vertical gap={16}>
        <Form.Item
          label='Project Cover'
          name={'cover'}
          getValueFromEvent={(e) => e}
        >
          <CoverUpload initialCoverId={project?.cover_id} />
        </Form.Item>
        <Form.Item<ProjectFieldType>
          label='Project Name (EN)'
          name={'title_eng'}
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder='Project Name' />
        </Form.Item>
        <Form.Item<ProjectFieldType>
          label='Project Description (EN)'
          name={'description_eng'}
          rules={[
            { required: true, message: 'Please enter project description' },
          ]}
        >
          <TextArea
            name='project-description'
            placeholder='Project Description'
            autoSize={{ minRows: 5 }}
          />
        </Form.Item>
        <Form.Item<ProjectFieldType>
          label='Project Name (UA)'
          name={'title_ua'}
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder='Project Name' />
        </Form.Item>
        <Form.Item<ProjectFieldType>
          label='Project Description (UA)'
          name={'description_ua'}
          rules={[
            { required: true, message: 'Please enter project description' },
          ]}
        >
          <TextArea
            name='project-description'
            placeholder='Project Description'
            autoSize={{ minRows: 5 }}
          />
        </Form.Item>

        <span>Project Links</span>
        <Flex vertical justify='between' gap={16}>
          {projectLinksFields.map((link) => (
            <Form.Item
              key={link.name}
              rules={[{ type: 'url', message: 'Please enter url' }]}
              label={`${link.label}:`}
              name={['social_urls', link.name]}
            >
              <Input
                placeholder={`Enter ${link.label} link`}
                style={{ width: '100%' }}
              />
            </Form.Item>
          ))}
        </Flex>

        <Form.Item
          label='Project Screens'
          name='screens'
          getValueFromEvent={(e) => {
            return e.map((file: UploadFile) => {
              return file.originFileObj as File;
            });
          }}
        >
          <ScreensUpload initialScreensIds={project?.screens_ids} />
        </Form.Item>

        <Form.Item<ProjectFieldType>
          label='Display on the Site'
          name={'isOnSite'}
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>
        <Form.Item<ProjectFieldType>
          label='Display on Hero Slider'
          name={'isOnHeroSlider'}
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Flex gap={16} align='stretch'>
            <Button type='primary' htmlType='submit' disabled={!isDirty}>
              {project ? 'Update' : 'Create'}
            </Button>
            <Link to={routes.projects.path}>
              <Button type='default'>Cancel</Button>
            </Link>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};
