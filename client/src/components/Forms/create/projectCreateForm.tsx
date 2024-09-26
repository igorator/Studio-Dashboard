import type { FormProps, UploadFile } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Button, Switch, Form, Input, Flex } from 'antd';
import { CoverUpload } from '../../Inputs/CoverUpload';
import { ScreensUpload } from '../../Inputs/ScreensUpload';
import { useAddProjectMutation } from '../../../redux/services/projectApi';

type FieldType = {
  title_eng: string;
  description_eng: string;
  title_ua: string;
  description_ua: string;
  cover: File;
  screens: File[];
  social_urls: { [key: string]: string | null };
  isShowedOnSite: boolean;
  isOnHeroSlider: boolean;
};

const projectLinksFields = [
  { label: 'Behance', name: 'behance' },
  { label: 'Dribble', name: 'dribble' },
  { label: 'Github', name: 'github' },
  { label: 'Upwork', name: 'upwork' },
];

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

export const ProjectCreateForm: React.FC = () => {
  const [addProject] = useAddProjectMutation();

  const onFinish: FormProps<FieldType>['onFinish'] = async (formData) => {
    try {
      const formDataToSend = new FormData();

      // Adding text data
      if (formData.title_eng) {
        formDataToSend.append('title_eng', formData.title_eng);
      }
      if (formData.description_eng) {
        formDataToSend.append('description_eng', formData.description_eng);
      }
      if (formData.title_ua) {
        formDataToSend.append('title_ua', formData.title_ua);
      }
      if (formData.description_ua) {
        formDataToSend.append('description_ua', formData.description_ua);
      }

      // Adding social URLs
      Object.entries(formData.social_urls).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(`social_urls[${key}]`, value);
        }
      });

      // Adding boolean data
      formDataToSend.append('isShowOnSite', formData.isShowedOnSite.toString());
      formDataToSend.append(
        'isOnHeroSlider',
        formData.isOnHeroSlider.toString(),
      );

      // Adding cover file
      if (formData.cover) {
        formDataToSend.append('cover', formData.cover);
      }

      if (formData.screens.length > 0) {
        formData.screens.forEach((screen: File, index: number) => {
          formDataToSend.append(`screens[${index}]`, screen);
        });
      }

      console.log('Formdata Before append:');
      console.log(formData);

      console.log('FormData To Send:');
      for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await addProject(formDataToSend);
      console.log('Response from server:', response);
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Form
      name='project-create'
      layout='vertical'
      initialValues={{
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
        isOnHeroSlider: false,
        isShowedOnSite: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Flex vertical gap={16}>
        <Form.Item
          label='Project Cover'
          name={'cover'}
          getValueFromEvent={(e) => e?.originFileObj}
        >
          <CoverUpload />
        </Form.Item>
        <Form.Item<FieldType>
          label='Project Name (EN)'
          name={'title_eng'}
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder='Project Name' />
        </Form.Item>
        <Form.Item<FieldType>
          label='Project Description (EN)'
          name={'description_eng'}
          rules={[
            { required: true, message: 'Please enter project description' },
          ]}
        >
          <TextArea
            name='project-description'
            placeholder='Project Description'
          />
        </Form.Item>
        <Form.Item<FieldType>
          label='Project Name (UA)'
          name={'title_ua'}
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder='Project Name' />
        </Form.Item>
        <Form.Item<FieldType>
          label='Project Description (UA)'
          name={'description_ua'}
          rules={[
            { required: true, message: 'Please enter project description' },
          ]}
        >
          <TextArea
            name='project-description'
            placeholder='Project Description'
          />
        </Form.Item>

        <label>Project Links</label>
        <Flex vertical justify='between' gap={16}>
          {projectLinksFields.map((link) => (
            <Form.Item
              key={link.name}
              rules={[{ type: 'url', message: 'Please enter url' }]}
              layout='horizontal'
              label={link.label}
              name={['social_urls', link.name]}
            >
              <Input placeholder={`Enter ${link.label} link`} />
            </Form.Item>
          ))}
        </Flex>

        <Form.Item
          label='Project Screens'
          name='screens'
          getValueFromEvent={(e) =>
            e?.map((file: UploadFile) => file.originFileObj)
          }
        >
          <ScreensUpload />
        </Form.Item>

        <Form.Item<FieldType>
          valuePropName='checked'
          label='Show on site'
          name={'isShowedOnSite'}
        >
          <Switch />
        </Form.Item>

        <Form.Item<FieldType>
          valuePropName='checked'
          label='Show on Hero slider'
          name={'isOnHeroSlider'}
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Flex gap={16}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>

            <Button type='default' htmlType='reset'>
              Reset
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};
