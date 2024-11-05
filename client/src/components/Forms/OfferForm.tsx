import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Switch, Form, Input, Flex, DatePicker, App } from 'antd';
import { CoverUpload } from '../Uploads/CoverUpload';
import {
  useAddOfferMutation,
  useEditOfferMutation,
} from '../../redux/services/offerApi';
import { routes } from '../../data/routes-config';
import { Link } from 'react-router-dom';
import dayjs, { Dayjs } from 'dayjs';
import { isEnglish, isUkrainian } from '../../utils/langValidation';

const { TextArea } = Input;

type OfferBaseType = {
  title_eng: string;
  description_eng: string;
  title_ua: string;
  description_ua: string;
  cover: File | string;
  start_date: string;
  expired_date: string;
  isOnSite: boolean;
};

type OfferFieldType = OfferBaseType;

type OfferEntryDataType = OfferBaseType & {
  id: number;
  cover_id: number | null;
};

export const OfferForm = ({
  offer,
  refetchOffer,
}: {
  offer?: OfferEntryDataType;
  refetchOffer?: () => void;
}) => {
  const { message } = App.useApp();
  const [addOffer] = useAddOfferMutation();
  const [editOffer] = useEditOfferMutation();

  const [startDate, setStartDate] = useState<Dayjs | null>(
    offer ? dayjs(offer.start_date) : null,
  );

  const [expiredDate, setExpiredDate] = useState<Dayjs | null>(
    offer ? dayjs(offer.expired_date) : null,
  );

  // Состояние для отслеживания изменений формы
  const [isDirty, setIsDirty] = useState(false);

  const onFinishFailed: FormProps<OfferFieldType>['onFinishFailed'] = () => {
    message.error('Please fill in all required fields correctly');
  };

  const onFinish: FormProps<OfferFieldType>['onFinish'] = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title_eng', formData.title_eng);
      formDataToSend.append('description_eng', formData.description_eng);
      formDataToSend.append('title_ua', formData.title_ua);
      formDataToSend.append('description_ua', formData.description_ua);
      formDataToSend.append('start_date', formData.start_date);
      formDataToSend.append('expired_date', formData.expired_date);
      formDataToSend.append('isOnSite', formData.isOnSite.toString());

      if (formData.cover instanceof File) {
        formDataToSend.append('cover', formData.cover);
      }

      if (offer) {
        const response = await editOffer({
          id: offer.id,
          updates: formDataToSend,
        });
        message.success('Offer updated');
        refetchOffer && refetchOffer();
        console.log(response);
      } else {
        const response = await addOffer(formDataToSend);
        message.success('Offer created');
        console.log(response);
      }
      setIsDirty(false); // Сбрасываем isDirty после успешного сохранения
    } catch (error) {
      console.error('Error creating or editing offer:', error);
    }
  };

  const initialValues = offer
    ? {
        cover: offer.cover_id || null,
        title_eng: offer.title_eng,
        description_eng: offer.description_eng,
        title_ua: offer.title_ua,
        description_ua: offer.description_ua,
        start_date: dayjs(offer.start_date),
        expired_date: dayjs(offer.expired_date),
        isOnSite: offer.isOnSite || false,
      }
    : {
        cover: null,
        title_eng: null,
        description_eng: null,
        title_ua: null,
        description_ua: null,
        start_date: null,
        expired_date: null,
        isOnSite: false,
      };

  const disabledStartDate = (current: Dayjs) => {
    return current && current.isBefore(dayjs().startOf('day'));
  };

  const disabledExpiredDate = (current: Dayjs) => {
    return current && startDate ? current.isBefore(startDate) : false;
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    if (expiredDate && date && expiredDate.isBefore(date)) {
      setExpiredDate(null);
    }
    setIsDirty(true); // Устанавливаем isDirty при изменении даты начала
  };

  // Функция для обработки изменений в полях формы
  const handleChange = () => {
    setIsDirty(true);
  };

  return (
    <Form
      name='offer-form'
      layout='vertical'
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      onValuesChange={handleChange} // Отслеживание изменений в форме
    >
      <Flex vertical gap={16}>
        <Form.Item
          label='Offer Cover'
          name='cover'
          getValueFromEvent={(e) => e}
        >
          <CoverUpload initialCoverId={offer ? offer.cover_id : null} />
        </Form.Item>

        <Form.Item<OfferFieldType>
          label='Offer Name (EN)'
          name='title_eng'
          rules={[
            { required: true, message: 'Please enter offer name' },
            {
              validator: (_, value) =>
                isEnglish(value)
                  ? Promise.resolve()
                  : Promise.reject('Offer name must be in English'),
            },
          ]}
        >
          <Input placeholder='Offer Name' />
        </Form.Item>

        <Form.Item<OfferFieldType>
          label='Offer Description (EN)'
          name='description_eng'
          rules={[
            { required: true, message: 'Please enter offer description' },
            {
              validator: (_, value) =>
                isEnglish(value)
                  ? Promise.resolve()
                  : Promise.reject('Offer description must be in English'),
            },
          ]}
        >
          <TextArea placeholder='Offer Description' autoSize={{ minRows: 5 }} />
        </Form.Item>

        <Form.Item<OfferFieldType>
          label='Offer Name (UA)'
          name='title_ua'
          rules={[
            { required: true, message: 'Please enter offer name' },
            {
              validator: (_, value) =>
                isUkrainian(value)
                  ? Promise.resolve()
                  : Promise.reject('Offer name must be in Ukrainian'),
            },
          ]}
        >
          <Input placeholder='Offer Name' />
        </Form.Item>

        <Form.Item<OfferFieldType>
          label='Offer Description (UA)'
          name='description_ua'
          rules={[
            { required: true, message: 'Please enter offer description' },
            {
              validator: (_, value) =>
                isUkrainian(value)
                  ? Promise.resolve()
                  : Promise.reject('Offer description must be in Ukrainian'),
            },
          ]}
        >
          <TextArea placeholder='Offer Description' autoSize={{ minRows: 5 }} />
        </Form.Item>

        <Form.Item<OfferFieldType>
          label='Start Date'
          name='start_date'
          rules={[{ required: true, message: 'Please select start date' }]}
        >
          <DatePicker
            onChange={handleStartDateChange}
            disabledDate={disabledStartDate}
          />
        </Form.Item>

        <Form.Item<OfferFieldType>
          label='Expired Date'
          name='expired_date'
          rules={[{ required: true, message: 'Please select expired date' }]}
        >
          <DatePicker
            disabled={!startDate}
            disabledDate={disabledExpiredDate}
            onChange={(date) => {
              setExpiredDate(date);
              setIsDirty(true); // Устанавливаем isDirty при изменении даты окончания
            }}
          />
        </Form.Item>

        <Form.Item<OfferFieldType>
          valuePropName='checked'
          label='Show on site'
          name='isOnSite'
        >
          <Switch onChange={handleChange} />
        </Form.Item>

        <Form.Item>
          <Flex gap={26} align='center'>
            <Button type='primary' htmlType='submit' disabled={!isDirty}>
              {offer ? 'Update' : 'Create'}
            </Button>
            <Button type='link'>
              <Link to={routes.offers.path}>Back</Link>
            </Button>
          </Flex>
        </Form.Item>
      </Flex>
    </Form>
  );
};
