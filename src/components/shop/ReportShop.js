
import { Button, Input, Form, Typography } from 'antd';
import React, { useState } from 'react';

const { Text } = Typography;

const { TextArea } = Input;


const handleReportShop = (reason, { shopId, onSuccess, onFailure }) => {
    fetch(`/.netlify/functions/reportShop `, {
        method: 'POST',
        body: JSON.stringify({ shop: shopId, reason })
    })
        .then(res => res.status === 200 ? onSuccess() : onFailure())
}

const ReportForm = (props) => {
    const [form] = Form.useForm();
    const { onSuccess, shopId } = props
    return (<>
        <Form
            name="reportShop"
            onFinish={(values) => handleReportShop(values.reportShopReason, props)}
            form={form}
        >
            <Form.Item
                label="Reason"
                name="reportShopReason"
                rules={[{ required: true, message: 'You must give a reason to report the shop' }]}
            >
                <TextArea placeholder="What is the reason for reporting the shop?" autoSize />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>)
}


const ReportShop = (props) => {
    const [toggleReason, setToggleReason] = useState(false);
    const [requestStatus, setRequestStatus] = useState({
        isSuccess: false,
        isFailure: false,
    })
    const handleToggleReason = () => setToggleReason(!toggleReason)
    const onSuccess = () => {
        handleToggleReason()
        setRequestStatus({ isSuccess: true })
    }

    const onFailure = () => {
        setRequestStatus({ isFailure: true })
    }

    return (
        <>
            <Button
                style={{ background: "red" }}
                onClick={handleToggleReason}
                type="primary"
                htmlType="submit">
                Report Shop
            </Button>
            {toggleReason && <ReportForm
                shopId={props.shopId}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />}
            {requestStatus.isFailure && <Text type="warning"> Reporting of shop failed. Please try again or contact support: {process.env.MAILGUN_RECIPIENT}</Text>}
            {requestStatus.isSuccess && <Text > Thanks, we have received the shop report and we will investigate the issue. </Text>}
        </>
    )
}

export default ReportShop