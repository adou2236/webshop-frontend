<template>
    <div id="all">
      <div class="showArea">
        <el-table
          :row-class-name="tableRowClassName"
          border
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="用户名">
          </el-table-column>
          <el-table-column
            label="订单号">
            <template slot-scope="scope">
              {{ scope.row.orderId }}
            </template>
          </el-table-column>
          <el-table-column
            label="下单用户">
            <template slot-scope="scope">
              {{ scope.row.orderUser.name }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" slot="reference" @click='handleEdit(scope.row)'>重置密码</el-button>
              <el-popconfirm
                title="确认删除？"
                confirmButtonText="确认"
                cancelButtonText='取消'
                icon="el-icon-info"
                iconColor="red"
                @onConfirm="handleDelete(scope.$index, scope.row)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="danger">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :hide-on-single-page="totallist<=10"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="10"
            background
            layout="prev, pager, next"
            :total="totallist">
          </el-pagination>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'userManage'
  }
</script>

<style scoped>

</style>
