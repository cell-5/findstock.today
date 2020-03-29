
import { Button, Input, Form } from 'antd';
import React, { useState } from 'react';

const { TextArea } = Input;


const handleReportShop = (props) =>  {
    console.log(window.location.search.shopId )
    fetch(`/.netlify/functions/reportShop `, {
    method: 'POST',
    body: JSON.stringify({ Shop: window.location.search.shopId })
})
    .then(res => console.log(res.json()))}
// .then(({ data = [] }) => {
// setShops(data);
// setLoading(false);
// })
// .catch(err => setLoading(false));

const ReportForm = () => {
    const [form] = Form.useForm();
    return (<>
        <Form
            name="reportShop"
            onFinish={handleReportShop}
            // onFinishFailed={onFinishFailed}
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


const ReportShop = () => {
    const [toggleReason, setToggleReason] = useState(false);
    return (
        <>
            <Button
                style={{ background: "red" }}
                onClick={() => setToggleReason(!toggleReason)}
                type="primary"
                htmlType="submit">
                Report Shop
            </Button>
            {toggleReason && <ReportForm />}
        </>
    )
}

export default ReportShop