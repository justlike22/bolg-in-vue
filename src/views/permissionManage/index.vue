<template>
  <el-card style="margin: 18px 2%;width: 95%">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" width="160">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="name" width="160">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template slot-scope="scope">
          <p>{{ scope.row.name }}</p>
        </template>
      </el-table-column>
      <el-table-column label="接口" width="220">
        <template slot-scope="scope">
          <p>{{ scope.row.code }}</p>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="修改日期" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.gmtModify }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getPermissionList } from '@/api/permission'
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    getPermissionList().then(response => {
      console.log(response)
      this.tableData = response.data
      this.total = response.total
    })
  }
}
</script>
