import { Route, Routes } from 'react-router-dom'
import Home from 'pages/Home'
import { Layout } from 'antd'
import Sidebar from 'layers/Sidebar'
import Concept from 'pages/Concept'

const { Content } = Layout

const App = () => (
  <Layout className='layout'>
    <Sidebar />
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: '#FFFFFF',
        borderRadius: 10,
      }}
    >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/concept' element={<Concept />} />
      </Routes>
    </Content>
  </Layout>
)

export default App
