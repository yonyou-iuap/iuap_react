import React, { Component } from "react";
import { actions } from "mirrorx";
import {
    Table,
    Button,
    InputGroup,
    FormControl,
    Select,
    Switch,
    Modal,
    Icon,
    Row,
    Col,
    Label,
    Input,
    Tooltip,
    Animate,
    Popconfirm
} from "tinper-bee";
import Form from 'bee-form';
import Header from "components/Header";
import EditableInput from './EditableCell';
import RefControl from "components/RefControl";
import createModal from "yyuap-ref";
import DeleteModal from "components/DeleteModal";
import commonref from "utils/commonref";
import docInfo from "utils/docInfo";
import './index.less';
import DatePicker from 'bee-datepicker';
import zhCN from "rc-calendar/lib/locale/zh_CN";
import enUS from "rc-calendar/lib/locale/en_US";
import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const format = "YYYY-MM-DD";

const dateInputPlaceholder = "选择日期";

const FormItem = Form.FormItem;

class OrderEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{
                id:'',
                key:0,
                detailCode:'明细编号',
                goodsCode:'商品编号',
                goodsName:'商品名称',
                price:100,
                total:1,
                amount:'',
                manufacturer:'',
                manufacturer_name:'',
                operate:''
            }],
            count: 1,
            value:''
        }
    }
    handleSubmit = () => {
        var self=this;
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('校验失败', values);
            } else {
                values.orderDetails=self.state.dataSource;
                actions.orderEdit.saveData(values);
                console.log('校验成功', values);
            }
        });
    }

    commonrefFun = params => {
        var option = commonref(params);
        createModal(option);
    };

    onCellChange = (index, key) => {
        return value => {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    };
    onDelete = index => {
        return () => {
            const dataSource = [...this.state.dataSource];
            dataSource.splice(index, 1);
            this.setState({ dataSource });
        };
    };
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            id:'1',
            key:count,
            detailCode:'明细编号1',
            goodsCode:'商品编号1',
            goodsName:'商品名称1',
            price:100,
            total:1,
            amount:'',
            manufacturer:'',
            manufacturer_name:'',
            operate:''
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1
        });
    };

    getBodyWrapper = body => {
        return (
            <Animate
                transitionName="move"
                component="tbody"
                className={body.props.className}
            >
                {body.props.children}
            </Animate>
        );
    };


    render() {
        const { form, itemData } = this.props;
        const columns = [
            {
                title: "明细编号",
                dataIndex: "detailCode",
                key: "detailCode",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "商品编号",
                dataIndex: "goodsCode",
                key: "goodsCode",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "商品名称",
                dataIndex: "goodsName",
                key: "goodsName",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "制造商",
                dataIndex: "manufacturer_name",
                key: "manufacturer_name",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "单价",
                dataIndex: "price",
                key: "price",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "数量",
                dataIndex: "total",
                key: "total",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "金额",
                dataIndex: "amount",
                key: "amount",
                render: (text, record, index) => (
                    <EditableInput
                        value={text}
                        onChange={this.onCellChange(index, "detailCode")}
                    />
                )
            },
            {
                title: "操作",
                dataIndex: "operation",
                key: "operation",
                render: (text, record, index) => {
                    return  (
                        <Popconfirm content="确认删除?" id="aa" onClose={this.onDelete(index)}>
                            <Icon type="uf-del" />
                        </Popconfirm>
                    ) ;
                }
            }
        ];
        let commonrefFun = params => {
            var option = commonref(params);
            createModal(option);
        };
        const HeadRefcallback = (ref, param) => {
            actions.orderEdit.headRefAction({ ref, param });
        };
        const { getFieldProps, getFieldError } = form;
        return (
            <div className="order-edit">
                <Header title='订单编辑'>
                    <Button
                        colors="primary"
                        onClick={this.handleSubmit}
                    >
                        保存
          </Button>
                </Header>

                <Form className="order-form">
                    <Row>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label> <span className="u-mast">*</span>订单编号：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <FormControl placeholder="订单编号"
                                        {...getFieldProps('orderCode', {
                                            validateTrigger: 'onBlur',
                                            validateFirst: true,
                                            rules: [{required: true, message: '请输入订单编号'}],
                                            initialValue: itemData.orderCode
                                        })} />
                                        <span className='error'>
                                        {getFieldError('orderCode')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label><span className="u-mast">*</span>订单名称：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <FormControl placeholder="订单名称"
                                        {...getFieldProps('orderName', {
                                            validateTrigger: 'onBlur',
                                            validateFirst: true,
                                            rules: [{required: true, message: '请输入订单名称'}],
                                            initialValue: itemData.orderName,
                                        })} />
                                    <span className='error'>
                                        {getFieldError('orderName')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>


                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>订单日期：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                <DatePicker
                                        format={format}
                                        locale={zhCN}
                                        placeholder={dateInputPlaceholder}
                                        autofocus={false}
                                        {...getFieldProps('orderDate', {
                                            initialValue: itemData.orderDate,
                                        })} 
                                        
                                    />
                                    {/* <FormControl placeholder="订单日期"
                                        {...getFieldProps('orderDate', {
                                            initialValue: itemData.orderDate,
                                        })} /> */}
                                    <span className='error'>
                                        {getFieldError('orderDate')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>


                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label><span className="u-mast">*</span>客户名称：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <FormControl placeholder="客户名称"
                                        {...getFieldProps('customer', {
                                            validateTrigger: 'onBlur',
                                            validateFirst: true,
                                            rules: [{required: true, message: '请输入客户名称'}],
                                            initialValue: itemData.customer,
                                        })} />
                                    <span className='error'>
                                        {getFieldError('customer')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>所属组织：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                <InputGroup simple>
                                    <FormControl placeholder="所属组织" type="text"
                                     {...getFieldProps('depta', {
                                        initialValue: itemData.depta,
                                    })}
                                    onClick={() =>
                                        commonrefFun({
                                            title: "组织",
                                            refType: 1,
                                            isRadio: true,
                                            hasPage: true,
                                            refCode: "commontree",
                                            callback: HeadRefcallback,
                                            fieldName: { key: "pk_workshop" },
                                            queryparams: { ...docInfo("dept"), condition: { dr: "0" } }
                                        })
                                    }
                                     />
                                    <InputGroup.Button shape="border">
                                        <span className="uf iconfont icon-canzhao"> </span>
                                    </InputGroup.Button>
                                </InputGroup>
                                    
                                    <span className='error'>
                                        {getFieldError('depta')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>



                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>业务负责人：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                <RefControl
                                        name="depta"
                                        placeholder="业务负责人"
                                        {...getFieldProps('busiman', {
                                            initialValue: itemData.busiman,
                                        })}
                                        onSearch={() =>
                                            commonrefFun({
                                                title: "业务负责人",
                                                refType: 1,
                                                isRadio: true,
                                                hasPage: true,
                                                refCode: "commontree",
                                                callback: HeadRefcallback,
                                                fieldName: { key: "pk_workshop" },
                                                queryparams: { ...docInfo("dept"), condition: { dr: "0" } }
                                            })
                                        }
                                    />
                                    <span className='error'>
                                        {getFieldError('busiman')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>订单状态：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <Select {
                                        ...getFieldProps('orderState', {
                                            initialValue: itemData.orderState,
                                        }
                                        )}>
                                        <Option value="">请选择</Option>
                                        <Option value="nowOrder">新订单</Option>
                                        <Option value="finished">已完成</Option>
                                        <Option value="canceled">已取消</Option>
                                    </Select>
                                    <span className='error'>
                                        {getFieldError('orderState')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>订单总金额：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <FormControl placeholder="订单总金额"
                                        {...getFieldProps('amount', {
                                            initialValue: itemData.amount,
                                        })} />
                                    <span className='error'>
                                        {getFieldError('amount')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>币种：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <FormControl placeholder="币种"
                                        {...getFieldProps('currency', {
                                            initialValue: itemData.currency,
                                        })} />
                                    <span className='error'>
                                        {getFieldError('currency')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>
                        <Col md={4} sm={6}>
                            <Col md={3} sm={6}>
                                <Label>备注：</Label>
                            </Col>
                            <Col md={9} sm={6}>
                                <FormItem>
                                    <FormControl placeholder="备注"
                                        {...getFieldProps('remark', {
                                            initialValue: itemData.remark,
                                        })} />
                                    <span className='error'>
                                        {getFieldError('remark')}
                                    </span>
                                </FormItem>
                            </Col>
                        </Col>

                    </Row>

                </Form>


                <div className="table-btn">
                    <Button
                        colors="primary"
                        onClick={this.handleAdd}
                    >
                        增行
            </Button>
                </div>
                <div>
                    <Table
                        data={this.state.dataSource}
                        columns={columns}
                        getBodyWrapper={this.getBodyWrapper}
                    />
                </div>
            </div>
        );
    }
}


export default Form.createForm()(OrderEdit);
