//一般直接写在一个js文件中
layui.use(
  ['layer', 'form', 'laydate', 'table', 'upload', 'element'],
  function() {
    var layer = layui.layer,
      form = layui.form,
      $ = layui.jquery,
      laydate = layui.laydate,
      upload = layui.upload,
      element = layui.element,
      table = layui.table;
    var testList = [];
    var testData = [];
    var mydetailData = [];
    var publicUrl = 'http://192.168.1.114:20012';
    laydate.render({
      elem: '#search-date',
      range: true,
      max: 0
    });
    laydate.render({
      elem: '#createTime',
      type: 'datetime'
    });
    laydate.render({
      elem: '#createTime1',
      type: 'datetime'
    });
    laydate.render({
      elem: '#createTime2',
      type: 'datetime'
    });
    laydate.render({
      elem: '#startTime',
      type: 'datetime'
    });
    laydate.render({
      elem: '#endTime',
      type: 'datetime'
    });
    laydate.render({
      elem: '#startTime2',
      type: 'datetime'
    });
    laydate.render({
      elem: '#endTime2',
      type: 'datetime'
    });
    // laydate.render({
    // 	elem: '#test8',
    // 	type: 'datetime'
    // });
    function dealData(data) {
      data.forEach((arr, index) => {
        if (arr.workorderType === 1) {
          arr.workorderType = '消缺工单';
        }
        if (arr.workorderType === 2) {
          arr.workorderType = '告警工单';
        }
        if (arr.workorderType === 3) {
          arr.workorderType = '抢修工单';
        }
        if (arr.workorderType === 4) {
          arr.workorderType = '随工工单';
        }
        if (arr.workorderType === 5) {
          arr.workorderType = '操作工单';
        }
        if (arr.status === 0) {
          arr.status = '未开始';
        }
        if (arr.status === 1) {
          arr.status = '执行中';
        }
        if (arr.status === 2) {
          arr.status = '已完成';
        }
      });
      return data;
    }
    function resetData(arr) {
      if (arr.workorderType === '消缺工单') {
        arr.workorderType = 1;
      }
      if (arr.workorderType === '告警工单') {
        arr.workorderType = 2;
      }
      if (arr.workorderType === '抢修工单') {
        arr.workorderType = 3;
      }
      if (arr.workorderType === '随工工单') {
        arr.workorderType = 4;
      }
      if (arr.workorderType === '操作工单') {
        arr.workorderType = 5;
      }
      if (arr.status === '未开始') {
        arr.status = 0;
      }
      if (arr.status === '执行中') {
        arr.status = 1;
      }
      if (arr.status === '已完成') {
        arr.status = 2;
      }

      return arr;
    }
    function getOrderList() {
      // 默认初始化工单列表
      var data = {
        pageNum: 1,
        pageSize: 9999,
        workorderType: 0,
        status: '',
        startTime: '',
        endTime: '',
        operator: ''
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#all-test',
              url: '', //数据接口
              data: listData,
              loading: true,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo'
                  }
                ]
              ]
            });
          }
        }
      });
    }
    function getMyOrderList(status) {
      // 默认初始化工单列表
      var data = {
        pageNum: 1,
        pageSize: 9999,
        workorderType: 0,
        status: status,
        startTime: '',
        endTime: '',
        operator: '343029'
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#my-test',
              url: '', //数据接口
              data: listData,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo3'
                  }
                ]
              ]
            });
          }
        }
      });
    }
    getOrderList();
    if ($('.search-content button').attr('data-type') === '2') {
      getMyOrderList(0);
    }
    if ($('.search-content button').attr('data-type') === '3') {
      getMyOrderList(1);
    }
    if ($('.search-content button').attr('data-type') === '4') {
      getMyOrderList(2);
    }
    // 初始化弹框下拉菜单
    $.ajax({
      url: publicUrl + '/console/selectTeam',
      type: 'post',
      contentType: 'application/json;charset=utf-8',
      // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
      dataType: 'json',
      success: function(res) {
        // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
        // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
        if (res.code === 200) {
          var str = '';
          if (res.code === 200) {
            for (var i = 0; i < res.data.length; i++) {
              str += `<option value=${res.data[i].grId}>${res.data[i].grName}</option>`;
            }
            $('.selectTeam').append(str);
          }
          form.render('select');
        }
      }
    });
    // 下框监听
    form.on('select(selectTeam1)', function(data) {
      var id = {
        grId: data.value
      }; //得到被选中的值
      $.ajax({
        url: publicUrl + '/console/selectUsers',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(id),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var str = `<option value="">请选择执行人员</option>`;
            if (res.code === 200) {
              for (var i = 0; i < res.data.length; i++) {
                str += `<option value=${res.data[i].usId}>${res.data[i].usName}</option>`;
              }
              $('.selectUsers1').html(str);
            }
            form.render('select');
          }
        }
      });
    });
    // 下框监听
    form.on('select(selectTeam2)', function(data) {
      var id = {
        grId: data.value
      }; //得到被选中的值
      $.ajax({
        url: publicUrl + '/console/selectUsers',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(id),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var str = `<option value="">请选择下一步人员</option>`;
            if (res.code === 200) {
              for (var i = 0; i < res.data.length; i++) {
                str += `<option value=${res.data[i].usId}>${res.data[i].usName}</option>`;
              }
              $('.selectUsers2').html(str);
            }
            form.render('select');
          }
        }
      });
    });
    function searchOrder() {
      var data1 = form.val('searchForm');
      var data2 = $('#search-date').val();
      if (data2 == '') {
        var startTime = '';
        var endTime = '';
      } else {
        var startTime = data2.substring(0, 10) + ' 00:00:00';
        var endTime = data2.substring(13, 23) + ' 00:00:00';
      }
      var workorderType = $('.layui-btn-group button.active').attr('data-type');
      var status = data1.status;
      // processingString(data2)
      var data = {
        pageNum: 1,
        pageSize: 9999,
        workorderType: workorderType,
        status: status,
        startTime: startTime,
        endTime: endTime,
        operator: ''
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#all-test',
              url: '', //数据接口
              data: listData,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo'
                  }
                ]
              ]
            });
          }
        }
      });
    }
    // 查询工单
    $('#search-order').click(function() {
      var data1 = form.val('searchForm');
      var data2 = $('#search-date').val();
      if (data2 == '') {
        var startTime = '';
        var endTime = '';
      } else {
        var startTime = data2.substring(0, 10) + ' 00:00:00';
        var endTime = data2.substring(13, 23) + ' 00:00:00';
      }
      var workorderType = $('.layui-btn-group button.active').attr('data-type');
      var status = data1.status;
      // processingString(data2)
      var data = {
        pageNum: 1,
        pageSize: 9999,
        workorderType: workorderType,
        status: status,
        startTime: startTime,
        endTime: endTime,
        operator: ''
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#all-test',
              url: '', //数据接口
              data: listData,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo'
                  }
                ]
              ]
            });
          }
        }
      });
    });
    // 查询待办工单
    $('#search-order2').click(function() {
      var data2 = $('#search-date').val();
      if (data2 == '') {
        var startTime = '';
        var endTime = '';
      } else {
        var startTime = data2.substring(0, 10) + ' 00:00:00';
        var endTime = data2.substring(13, 23) + ' 00:00:00';
      }
      // processingString(data2)
      var data = {
        pageNum: 1,
        pageSize: 9999,
        startTime: startTime,
        endTime: endTime,
        operator: '343029',
        status: 0
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#my-test',
              url: '', //数据接口
              data: listData,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo3'
                  }
                ]
              ]
            });
          }
        }
      });
    });
    // 查询进行工单
    $('#search-order3').click(function() {
      var data2 = $('#search-date').val();
      if (data2 == '') {
        var startTime = '';
        var endTime = '';
      } else {
        var startTime = data2.substring(0, 10) + ' 00:00:00';
        var endTime = data2.substring(13, 23) + ' 00:00:00';
      }
      // processingString(data2)
      var data = {
        pageNum: 1,
        pageSize: 9999,
        startTime: startTime,
        endTime: endTime,
        operator: '343029',
        status: 1
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#my-test',
              url: '', //数据接口
              data: listData,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo3'
                  }
                ]
              ]
            });
          }
        }
      });
    });
    // 查询已完成工单
    $('#search-order4').click(function() {
      var data2 = $('#search-date').val();
      if (data2 == '') {
        var startTime = '';
        var endTime = '';
      } else {
        var startTime = data2.substring(0, 10) + ' 00:00:00';
        var endTime = data2.substring(13, 23) + ' 00:00:00';
      }
      // processingString(data2)
      var data = {
        pageNum: 1,
        pageSize: 9999,
        startTime: startTime,
        endTime: endTime,
        operator: '343029',
        status: 2
      };
      $.ajax({
        url: publicUrl + '/console/selectWorkorder',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        // 设置的是请求参数
        data: JSON.stringify(data),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
          // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
          if (res.code === 200) {
            var listData = res.data.list;
            dealData(listData);
            table.render({
              elem: '#my-test',
              url: '', //数据接口
              data: listData,
              cols: [
                [
                  //表头
                  {
                    field: 'workorderId',
                    title: '工单编号'
                  },
                  {
                    field: 'content',
                    title: '内容',
                    width: 500
                  },
                  {
                    field: 'workorderType',
                    title: '工单类型'
                  },
                  {
                    field: 'status',
                    title: '状态'
                  },
                  {
                    field: 'view',
                    title: '处理意见'
                  },
                  {
                    field: 'createTime',
                    title: '创建时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo3'
                  }
                ]
              ]
            });
          }
        }
      });
    });
    // 我的修改弹框
    table.on('tool(my-test)', function(obj) {
      var data = obj.data;
      if (obj.event === 'modification') {
        layer.open({
          type: 1,
          title: '修改工单',
          shade: false,
          resize: false,
          content: $('#order-form'),
          area: ['60%', '70%'],
          yes: function(index, layero) {
            alert('确定按钮点击');
          },
          success: function(index) {
            table.render({
              elem: '#testList',
              height: 260, //固定值
              url: '', //数据接口
              data: [
                {
                  id: 10000,
                  username: 'user-0',
                  sex: '女',
                  city: '城市-0',
                  sign: '签名-0',
                  time: '2019-12-11'
                },
                {
                  id: 10000,
                  username: 'user-0',
                  sex: '女',
                  city: '城市-0',
                  sign: '签名-0',
                  time: '2019-12-11'
                }
              ],
              cols: [
                [
                  //表头
                  {
                    field: 'id',
                    title: '工单编号',
                    width: 180
                  },
                  {
                    field: 'username',
                    title: '级别',
                    width: 80
                  },
                  {
                    field: 'sex',
                    title: '状态'
                  },
                  {
                    field: 'city',
                    title: '缺陷描述'
                  },
                  {
                    field: 'sign',
                    title: '缺陷来源'
                  },
                  {
                    field: 'time',
                    title: '发生时间'
                  },
                  {
                    title: '操作',
                    width: 150,
                    align: 'center',
                    toolbar: '#barDemo2'
                  }
                ]
              ]
            });
          }
        });
      }
    });
    // tab切换
    element.on('tab(tab)', function(data) {
      if (data.index === 1) {
        $('.table-content').hide();
        getMyOrderList();
        // table.render({
        //   elem: '#my-test',
        //   url: '', //数据接口
        //   data: [
        //     {
        //       id: 10000,
        //       username: 'user-0',
        //       sex: '女',
        //       city: '城市-0',
        //       sign: '签名-0',
        //       time: '2019-12-11'
        //     },
        //     {
        //       id: 10000,
        //       username: 'user-0',
        //       sex: '女',
        //       city: '城市-0',
        //       sign: '签名-0',
        //       time: '2019-12-11'
        //     }
        //   ],
        //   cols: [
        //     [
        //       //表头
        //       {
        //         field: 'id',
        //         title: '工单编号'
        //       },
        //       {
        //         field: 'username',
        //         title: '级别'
        //       },
        //       {
        //         field: 'sex',
        //         title: '状态'
        //       },
        //       {
        //         field: 'city',
        //         title: '缺陷描述'
        //       },
        //       {
        //         field: 'sign',
        //         title: '缺陷来源'
        //       },
        //       {
        //         field: 'time',
        //         title: '发生时间'
        //       },
        //       {
        //         title: '操作',
        //         width: 150,
        //         toolbar: '#barDemo3'
        //       }
        //     ]
        //   ]
        // });
      } else {
        $('.table-content').show();
        table.reload();
      }
    });
    //指定允许上传的文件类型
    // upload.render({
    //   elem: '#upload',
    //   url: publicUrl + '/console/upload',
    //   accept: 'file', //普通文件
    //   done: function(res) {
    //     console.log(res);
    //   }
    // });
    //指定允许上传的文件类型
    // upload.render({
    //   elem: '#upload2',
    //   url: publicUrl + '/console/upload',
    //   accept: 'file', //普通文件
    //   done: function(res) {
    //     layer.msg(res.message);
    //   }
    // });
    var demoListView2 = $('#demoList'),
      uploadListIns = upload.render({
        elem: '#upload',
        url: publicUrl + '/console/upload',
        accept: 'file',
        multiple: true,
        auto: false,
        bindAction: '#testListAction',
        choose: function(obj) {
          var files = (this.files = obj.pushFile()); //将每次选择的文件追加到文件队列
          //读取本地文件
          obj.preview(function(index, file, result) {
            var tr = $(
              [
                '<tr id="upload-' + index + '">',
                '<td>' + file.name + '</td>',
                '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>',
                '<td>等待上传</td>',
                '<td>',
                '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
                '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>',
                '</td>',
                '</tr>'
              ].join('')
            );

            //单个重传
            tr.find('.demo-reload').on('click', function() {
              obj.upload(index, file);
            });

            //删除
            tr.find('.demo-delete').on('click', function() {
              delete files[index]; //删除对应的文件
              tr.remove();
              uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
            });

            demoListView2.append(tr);
          });
        },
        done: function(res, index, upload) {
          if (res.code == 200) {
            //上传成功
            var tr = demoListView2.find('tr#upload-' + index),
              tds = tr.children();
            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(3).html(''); //清空操作
            return delete this.files[index]; //删除文件队列已经上传成功的文件
          }
          this.error(index, upload);
        },
        error: function(index, upload) {
          var tr = demoListView2.find('tr#upload-' + index),
            tds = tr.children();
          tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
          tds
            .eq(3)
            .find('.demo-reload')
            .removeClass('layui-hide'); //显示重传
        }
      });
    var demoListView = $('#demoList2'),
      uploadListIns = upload.render({
        elem: '#upload2',
        url: publicUrl + '/console/upload',
        accept: 'file',
        multiple: true,
        auto: false,
        bindAction: '#testListAction2',
        choose: function(obj) {
          var files = (this.files = obj.pushFile()); //将每次选择的文件追加到文件队列
          //读取本地文件
          obj.preview(function(index, file, result) {
            var tr = $(
              [
                '<tr id="upload-' + index + '">',
                '<td>' + file.name + '</td>',
                '<td>' + (file.size / 1014).toFixed(1) + 'kb</td>',
                '<td>等待上传</td>',
                '<td>',
                '<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>',
                '<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>',
                '</td>',
                '</tr>'
              ].join('')
            );

            //单个重传
            tr.find('.demo-reload').on('click', function() {
              obj.upload(index, file);
            });

            //删除
            tr.find('.demo-delete').on('click', function() {
              delete files[index]; //删除对应的文件
              tr.remove();
              uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
            });

            demoListView.append(tr);
          });
        },
        done: function(res, index, upload) {
          if (res.code == 200) {
            //上传成功
            var tr = demoListView.find('tr#upload-' + index),
              tds = tr.children();
            tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
            tds.eq(3).html(''); //清空操作
            return delete this.files[index]; //删除文件队列已经上传成功的文件
          }
          this.error(index, upload);
        },
        error: function(index, upload) {
          var tr = demoListView.find('tr#upload-' + index),
            tds = tr.children();
          tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
          tds
            .eq(3)
            .find('.demo-reload')
            .removeClass('layui-hide'); //显示重传
        }
      });
    $('#reset').click(function() {
      $('#searchForm')[0].reset();
      layui.form.render();
    });
    // 新增任务
    $('#add-test').click(function() {
      layer.open({
        type: 1,
        title: '添加任务',
        shade: false,
        resize: false,
        content: $('#add-test-form'),
        btn: ['确定', '取消'],
        area: ['60%', '500px'],
        success: function(index) {
          table.render({
            elem: '#addtestList',
            height: 260, //固定值
            url: '', //数据接口
            data: [],
            cols: [
              [
                //表头
                { type: 'checkbox', fixed: 'left' },
                {
                  field: 'warningDataId',
                  title: '工单编号',
                  width: 180
                },
                {
                  field: 'context',
                  title: '工单内容'
                },
                {
                  field: 'sex',
                  title: '状态'
                },
                {
                  field: 'city',
                  title: '缺陷描述'
                },
                {
                  field: 'sign',
                  title: '缺陷来源'
                },
                {
                  field: 'time',
                  title: '发生时间'
                }
              ]
            ]
          });
        },
        yes: function(index, layero) {
          layer.close(index);
          var checkStatus = table.checkStatus('addtestList');
          console.log(checkStatus.data);
          testList = [];
          checkStatus.data.forEach((arr, index) => {
            testList.push(arr.warningDataId);
          });
          table.render({
            elem: '#testList',
            height: 260, //固定值
            url: '', //数据接口
            data: checkStatus.data,
            cols: [
              [
                //表头
                {
                  field: 'warningDataId',
                  title: '工单编号',
                  width: 180
                },
                {
                  field: 'context',
                  title: '工单内容'
                },
                {
                  field: 'sex',
                  title: '状态'
                },
                {
                  field: 'city',
                  title: '缺陷描述'
                },
                {
                  field: 'sign',
                  title: '缺陷来源'
                },
                {
                  field: 'time',
                  title: '发生时间'
                }
              ]
            ]
          });
        }
      });
    });
    $('#new-order').click(function() {
      layer.open({
        type: 1,
        title: '创建工单',
        shade: false,
        resize: false,
        content: $('#dialog-new-order'),
        btn: ['确定', '取消'],
        area: ['600px', '200px'],
        yes: function(index, layero) {
          if ($('#dialog-new-order button.active').length !== 1) {
            layer.msg('请选择工单类型');
          } else {
            layer.close(index);
            var type = {
              workorderType: $('#dialog-new-order button.active').attr(
                'data-type'
              )
            };
            $('#workorderType').val(
              $('#dialog-new-order button.active').text()
            );
            // 加载动作下拉
            $.ajax({
              url: publicUrl + '/console/selectActionByType',
              type: 'post',
              contentType: 'application/json;charset=utf-8',
              data: JSON.stringify(type),
              // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
              dataType: 'json',
              success: function(res) {
                // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                if (res.code === 200) {
                  var str = `<option value="">请选择执行动作</option>`;
                  if (res.code === 200) {
                    for (var i = 0; i < res.data.length; i++) {
                      str += `<option value=${res.data[i].actionId}>${res.data[i].actionName}</option>`;
                    }
                    $('#action').html(str);
                  }
                  form.render('select');
                }
              }
            });
            layer.open({
              type: 1,
              title: '创建工单',
              shade: false,
              resize: false,
              content: $('#order-form'),
              area: ['60%', '70%'],
              yes: function(index, layero) {
                alert('确定按钮点击');
              },
              success: function(index) {
                table.render({
                  elem: '#testList',
                  height: 260, //固定值
                  url: '', //数据接口
                  data: testData,
                  cols: [
                    [
                      //表头
                      {
                        field: 'warningDataId',
                        title: '工单编号',
                        width: 180
                      },
                      {
                        field: 'context',
                        title: '工单内容'
                      },
                      {
                        field: 'sex',
                        title: '状态'
                      },
                      {
                        field: 'city',
                        title: '缺陷描述'
                      },
                      {
                        field: 'sign',
                        title: '缺陷来源'
                      },
                      {
                        field: 'time',
                        title: '发生时间'
                      }
                    ]
                  ]
                });
              }
            });
          }
        }
      });
    });
    //监听详情
    table.on('tool(all-test)', function(obj) {
      var data = obj.data;
      resetData(data);
      var dataDetail = {
        formId: data.formId, //表单id
        workorderId: data.workorderId, //工单id
        workorderType: data.workorderType //工单类型
      };
      if (obj.event === 'detail') {
        $.ajax({
          url: publicUrl + '/console/selectWorkorderDetail',
          type: 'post',
          contentType: 'application/json;charset=utf-8',
          // 设置的是请求参数
          data: JSON.stringify(dataDetail),
          // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
          dataType: 'json',
          success: function(res) {
            // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
            // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
            if (res.code === 200) {
              var listData = res.data;
              dealData(listData);
              layer.open({
                type: 1,
                title: '工单详情',
                shade: false,
                resize: false,
                content: $('#dialog1'),
                btn: ['确定', '取消'],
                area: ['88%', '50%'],
                yes: function(index, layero) {
                  layer.close(index);
                },
                success: function(index) {
                  table.render({
                    elem: '#demo2',
                    url: '', //数据接口
                    data: listData,
                    cols: [
                      [
                        //表头
                        {
                          field: 'workorderId',
                          title: '工单编号'
                        },
                        {
                          field: 'usName',
                          title: '执行人名称'
                        },
                        {
                          field: 'actionName',
                          title: '动作名称'
                        },
                        {
                          field: 'createUser',
                          title: '创建人名称'
                        },
                        {
                          field: 'grName',
                          title: '团队名称',
                          width: 160
                        },
                        {
                          field: 'planStartTime',
                          title: '计划开始时间',
                          width: 160
                        },
                        {
                          field: 'planEndTime',
                          title: '计划结束时间'
                        },
                        {
                          field: 'replyPrestepContent',
                          title: '回复内容'
                        },
                        {
                          field: 'currentContent',
                          title: '本环节处理情况'
                        },
                        {
                          field: 'nextStepView',
                          title: '下一步处理意见'
                        },
                        {
                          field: 'otherInformation',
                          title: '补充信息'
                        },
                        {
                          field: 'fileUrl',
                          title: '作业文档地址',
                          width: 135
                        }
                      ]
                    ]
                  });
                }
              });
            }
          }
        });
      }
    });
    // 我的工单详情
    table.on('tool(my-test)', function(obj) {
      var data = obj.data;
      resetData(data);
      var dataDetail = {
        formId: data.formId, //表单id
        workorderId: data.workorderId, //工单id
        workorderType: data.workorderType, //工单类型
        stepId: data.stepId
      };
      if (obj.event === 'mydetail') {
        $.ajax({
          url: publicUrl + '/console/selectUserWorkorder',
          type: 'post',
          contentType: 'application/json;charset=utf-8',
          // 设置的是请求参数
          data: JSON.stringify(dataDetail),
          // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
          dataType: 'json',
          success: function(res) {
            // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
            // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
            if (res.code === 200) {
              var listData = res.data;
              dealData(listData);
              detailData = listData;
              layer.open({
                type: 1,
                title: '工单详情',
                shade: false,
                resize: false,
                content: $('#dialog1'),
                btn: ['确定', '取消'],
                area: ['88%', '50%'],
                yes: function(index, layero) {
                  layer.close(index);
                },
                success: function(index) {
                  table.render({
                    elem: '#demo2',
                    url: '', //数据接口
                    data: listData,
                    cols: [
                      [
                        //表头
                        {
                          field: 'workorderId',
                          title: '工单编号'
                        },
                        {
                          field: 'usName',
                          title: '执行人名称'
                        },
                        {
                          field: 'actionName',
                          title: '动作名称'
                        },
                        {
                          field: 'createUser',
                          title: '创建人名称'
                        },
                        {
                          field: 'grName',
                          title: '团队名称',
                          width: 160
                        },
                        {
                          field: 'planStartTime',
                          title: '计划开始时间',
                          width: 160
                        },
                        {
                          field: 'planEndTime',
                          title: '计划结束时间'
                        },
                        {
                          field: 'replyPrestepContent',
                          title: '回复内容'
                        },
                        {
                          field: 'currentContent',
                          title: '本环节处理情况'
                        },
                        {
                          field: 'nextStepView',
                          title: '下一步处理意见'
                        },
                        {
                          field: 'otherInformation',
                          title: '补充信息'
                        },
                        {
                          field: 'fileUrl',
                          title: '作业文档地址',
                          width: 135
                        }
                      ]
                    ]
                  });
                }
              });
            }
          }
        });
      }
      if (obj.event === 'modification') {
        $.ajax({
          url: publicUrl + '/console/selectUserWorkorder',
          type: 'post',
          contentType: 'application/json;charset=utf-8',
          // 设置的是请求参数
          data: JSON.stringify(dataDetail),
          // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
          dataType: 'json',
          success: function(res) {
            // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
            // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
            if (res.code === 200) {
              var listData = res.data;
              console.log(listData);
              mydetailData = res.data;
              layer.open({
                type: 1,
                title: '编辑工单',
                shade: false,
                resize: false,
                content: $('#edit-form'),
                area: ['60%', '70%'],
                success: function(index) {
                  // 加载动作下拉
                  $.ajax({
                    url: publicUrl + '/console/selectActionByType',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: JSON.stringify({
                      workorderType: listData[0].workorderType
                    }),
                    // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                    dataType: 'json',
                    success: function(res) {
                      // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                      // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                      if (res.code === 200) {
                        var str = `<option value="">请选择执行动作</option>`;
                        if (res.code === 200) {
                          for (var i = 0; i < res.data.length; i++) {
                            str += `<option value=${res.data[i].actionId}>${res.data[i].actionName}</option>`;
                          }
                          $('#edit-action').html(str);
                        }
                        $('#edit-action').val(listData[0].actionId);
                        form.render('select');
                      }
                    }
                  });
                  // 执行人员加载
                  var id = {
                    grId: listData[0].operateTeam
                  }; //得到被选中的值
                  $.ajax({
                    url: publicUrl + '/console/selectUsers',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    // 设置的是请求参数
                    data: JSON.stringify(id),
                    // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                    dataType: 'json',
                    success: function(res) {
                      // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                      // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                      if (res.code === 200) {
                        var str = `<option value="">请选择执行人员</option>`;
                        if (res.code === 200) {
                          for (var i = 0; i < res.data.length; i++) {
                            str += `<option value=${res.data[i].usId}>${res.data[i].usName}</option>`;
                          }
                          $('#edit-selectUsers').html(str);
                        }
                        $('#edit-selectUsers').val(listData[0].operator);
                        form.render('select');
                      }
                    }
                  });
                  $.ajax({
                    url: publicUrl + '/console/selectTeam',
                    type: 'post',
                    contentType: 'application/json;charset=utf-8',
                    // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
                    dataType: 'json',
                    success: function(res) {
                      // 一旦设置的 dataType 选项，就不再关心 服务端 响应的 Content-Type 了
                      // 客户端会主观认为服务端返回的就是 JSON 格式的字符串
                      if (res.code === 200) {
                        var str = '';
                        if (res.code === 200) {
                          for (var i = 0; i < res.data.length; i++) {
                            str += `<option value=${res.data[i].grId}>${res.data[i].grName}</option>`;
                          }
                          $('#edit-selectTeam').append(str);
                          $('#edit-selectTeam').val(listData[0].operateTeam);
                        }
                        form.render('select');
                      }
                    }
                  });
                  // 默认赋值
                  $('#edit-workorderType').attr(
                    'data-id',
                    listData[0].workorderType
                  );
                  $('#createAt').attr('data-id', listData[0].createAt);
                  dealData(listData);

                  table.render({
                    elem: '#editTestList',
                    height: 260, //固定值
                    url: '', //数据接口
                    data: listData[0].task,
                    cols: [
                      [
                        {
                          field: 'warningDataId',
                          title: '工单编号',
                          width: 180
                        },
                        {
                          field: 'context',
                          title: '工单内容'
                        },
                        {
                          field: 'sex',
                          title: '状态'
                        },
                        {
                          field: 'city',
                          title: '缺陷描述'
                        },
                        {
                          field: 'sign',
                          title: '缺陷来源'
                        },
                        {
                          field: 'time',
                          title: '发生时间'
                        }
                      ]
                    ]
                  });
                  form.val('editForm', {
                    workorderType: listData[0].workorderType, // "name": "value"
                    createAt: listData[0].createUser,
                    createTime1: listData[0].createTime,
                    planStartTime: listData[0].planStartTime,
                    planEndTime: listData[0].planEndTime,
                    currentContent: listData[0].currentContent,
                    replyPrestepContent: listData[0].replyPrestepContent,
                    nextStepView: listData[0].nextStepView,
                    otherInformation: listData[0].otherInformation
                  });
                  form.render();
                }
              });
            }
          }
        });
      }
    });
    $('.layui-tab-content .layui-btn-group button').click(function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $(this)
        .removeClass('layui-btn-primary')
        .siblings()
        .addClass('layui-btn-primary');
      $('#searchForm input').each(function(index, el) {
        el.checked = false;
      });
      form.render('radio');
      searchOrder();
      // 随工类型展示
      // if ($(this).attr('data-type') === '4') {
      // 	$('.work').show()
      // } else {
      // 	$('.work').hide()
      // }
    });
    // 弹框类型选择
    $('#dialog-new-order button').click(function() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $(this)
        .removeClass('layui-btn-primary')
        .siblings()
        .addClass('layui-btn-primary');
    });
    // 提交创建表单数据
    form.on('submit(orderSubmit)', function(data) {
      var formData = data.field;
      formData.workorderType = $('#dialog-new-order button.active').attr(
        'data-type'
      );
      formData.taskId = testList;
      formData.createAt = '343029';
      console.log(formData);
      $.ajax({
        url: publicUrl + '/console/createWarning',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(formData),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          if (res.code === 200) {
            layer.closeAll();
            layer.msg(res.message);
            getOrderList();
          }
        }
      });
      return false;
    });
    // 提交修改表单数据
    form.on('submit(editSubmit)', function(data) {
      var formData = data.field;
      console.log(mydetailData[0]);
      formData.workorderType = $('#edit-workorderType').attr('data-id');
      formData.createAt = mydetailData[0].createAt;
      formData.formId = mydetailData[0].formId;
      formData.workorderId = mydetailData[0].workorderId;
      formData.stepId = mydetailData[0].stepId;
      console.log(formData);
      $.ajax({
        url: publicUrl + '/console/updateWarning',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify(formData),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          if (res.code === 200) {
            layer.closeAll();
            layer.msg(res.message);
            getMyOrderList();
          }
        }
      });
      return false;
    });
    // 搜索任务
    $('#search-test').click(function() {
      $.ajax({
        url: publicUrl + '/console/selectWarningData',
        type: 'post',
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify({
          warningDataId: ''
        }),
        // 用于设置响应体的类型 注意 跟 data 参数没关系！！！
        dataType: 'json',
        success: function(res) {
          if (res.code === 200) {
            table.render({
              elem: '#addtestList',
              height: 260, //固定值
              loading: true,
              data: res.data,
              cols: [
                [
                  //表头
                  { type: 'checkbox', fixed: 'left' },
                  {
                    field: 'warningDataId',
                    title: '工单编号',
                    width: 180
                  },
                  {
                    field: 'context',
                    title: '工单内容'
                  },
                  {
                    field: 'sex',
                    title: '状态'
                  },
                  {
                    field: 'city',
                    title: '缺陷描述'
                  },
                  {
                    field: 'sign',
                    title: '缺陷来源'
                  },
                  {
                    field: 'time',
                    title: '发生时间'
                  }
                ]
              ]
            });
            table.reload();
          }
        }
      });
    });
  }
);
