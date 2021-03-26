import Mock from 'mockjs'

// 获取当前用户信息
Mock.mock('/api/auth/user_current', {
    code: 200,
    msg: 'OK',
    data: {
        nickname: '老黑先生',
        accessToken: 'fqh0i-LyINZ-RvK5d-Akj3a-uBYRl',
    }
})

// 提交数据
Mock.mock(/getData/, 'get', {
    code: 200,
    msg: '数据提交成功',
    data: {}
})