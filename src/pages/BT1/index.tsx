import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
  Space,
} from "antd";
import type { ColumnsType } from "antd/es/table";

interface Product {
  key: string;
  name: string;
  price: number;
  quantity: number;
}

const initialData: Product[] = [
  { key: "1", name: "Laptop Dell XPS 13", price: 25000000, quantity: 10 },
  { key: "2", name: "iPhone 15 Pro Max", price: 30000000, quantity: 15 },
  { key: "3", name: "Samsung Galaxy S24", price: 22000000, quantity: 20 },
  { key: "4", name: "iPad Air M2", price: 18000000, quantity: 12 },
  { key: "5", name: "MacBook Air M3", price: 28000000, quantity: 8 },
];

const BT1 = () => {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAddProduct = () => {
    form.validateFields().then((values) => {
      const newProduct: Product = {
        key: Date.now().toString(),
        name: values.name,
        price: values.price,
        quantity: values.quantity,
      };

      setProducts([...products, newProduct]);
      message.success("Thêm sản phẩm thành công");
      form.resetFields();
      setIsModalOpen(false);
    });
  };

  const handleDelete = (key: string) => {
    setProducts(products.filter((item) => item.key !== key));
    message.success("Xóa sản phẩm thành công");
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Product> = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value: number) => value.toLocaleString() + " đ",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button danger size="small">
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </Button>
      </Space>

      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="key"
      />

      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalOpen}
        onOk={handleAddProduct}
        onCancel={() => setIsModalOpen(false)}
        okText="Thêm"
        cancelText="Hủy"
      >

        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: "Vui lòng nhập giá" },
              { type: "number", min: 1, message: "Giá phải là số dương" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: "Vui lòng nhập số lượng" },
              { type: "number", min: 1, message: "Số lượng phải là số nguyên dương" },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default BT1;
