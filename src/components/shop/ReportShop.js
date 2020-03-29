
import { Button, Input, Form } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;


const handleReportShop = (reason, { shopId, onSuccess }) => {
    fetch(`/.netlify/functions/reportShop `, {
        method: 'POST',
        body: JSON.stringify({ shop: shopId, reason })
    })
        .then(res => { res.status === 200 ? onSuccess() : null; 
            console.log(res) }) // TODO on failure
}

const ReportForm = (props) => {
    const [form] = Form.useForm();
    const { onSuccess, shopId } = props
    return (<>
        <Form
            name="reportShop"
            onFinish={(values) => handleReportShop(values.reportShopReason, { shopId, onSuccess })}
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

    const handleToggleReason = () => setToggleReason(!toggleReason)
    return (
        <>
            <Button
                style={{ background: "red" }}
                onClick={handleToggleReason}
                type="primary"
                htmlType="submit">
                Report Shop
            </Button>
            {toggleReason && <ReportForm shopId={props.shopId} onSuccess={handleToggleReason} />}
        </>
    )
}

export default ReportShop