<template>
  <div>

    <el-col
      :span="19"
      class="main">
      <el-table
        ref="multipleTable"
        :data="userAll"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          property="username"
          label="Username"
          width="120">
        </el-table-column>
        <el-table-column
          property="role"
          label="Role"
          width="120">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEdit(scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-col
      :span="2"
      class="action">
      <el-button
        type="text"
        size="small"
        @click="addDialog = true">Add</el-button>
      <el-button
        type="text"
        size="small"
        @click="handleDelete"
        :disabled="multipleSelect.length < 1">Delete</el-button>
    </el-col>

    <el-dialog
      title="Add User"
      :visible.sync="addDialog"
      @close="closeDialog('form')"
      :close-on-click-modal="false">
      <el-form
        label-position="left"
        :model="form"
        :rules="rules"
        ref="form"
        status-icon>
        <el-form-item
          label="Username"
          :label-width="formLabelWidth"
          prop="username">
          <el-input
            v-model="form.username"
            auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          :label-width="formLabelWidth"
          prop="password">
          <el-input
            type="password"
            v-model="form.password"
            auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Role"
          :label-width="formLabelWidth"
          prop="role">
          <el-select
            v-model="form.role"
            placeholder="Select"
            style="width: 100%;">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          @click="addDialog = false">Cancel</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleAddSubmit('form')">Save</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="Edit User"
      :visible.sync="editDialog"
      @close="closeDialog('form')"
      :close-on-click-modal="false">
      <el-form
        label-position="left"
        :model="form"
        :rules="rules"
        ref="form"
        status-icon>
        <el-form-item
          label="Username"
          :label-width="formLabelWidth"
          prop="username">
          <el-input
            v-model="form.username"
            auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="Role"
          :label-width="formLabelWidth"
          prop="role">
          <el-select
            v-model="form.role"
            placeholder="Select"
            style="width: 100%;">
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          @click="editDialog = false">Cancel</el-button>
        <el-button
          type="primary"
          size="small"
          @click="handleEditSubmit('form')">Update</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import _ from 'lodash'
  import { USER_ALL, USER_CREATE, USER_DELETE, USER_UPDATE } from '@/apollo/queries/user'

  export default {
    apollo: {
      userAll: {
        query: USER_ALL,
      }
    },
    data() {
      return {
        addDialog: false,
        editDialog: false,
        formLabelWidth: '120px',
        userAll: [],
        multipleSelect: [],
        roles: [{
          label: 'Admin',
          value: 'admin'
        }, {
          label: 'User',
          value: 'user'
        }],
        form: {
          username: '',
          password: '',
          role: ''
        },
        rules: {
          username: [
            {required: true, message: 'Please input username', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please input password', trigger: 'blur'}
          ],
          role: [
            {required: true, message: 'Please select role', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      handleSelectionChange: async function (val) {
        this.multipleSelect = _.map(val, v => ({ id: v.id }))
      },
      closeDialog(form) {
        this.$refs[form].resetFields();
      },
      handleAddSubmit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if(valid) {
            try {
              const { data } = await this.$apollo.mutate({
                mutation: USER_CREATE,
                variables: {
                  username: this.form.username,
                  password: this.form.password,
                  role: this.form.role
                },
                update: (store, { data: { userCreate } }) => {
                  const data = store.readQuery({ query: USER_ALL })
                  data.userAll.push(userCreate)
                  store.writeQuery({ query: USER_ALL, data })
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  userCreate: {
                    __typename: 'User',
                    id: -1,
                    username: this.form.username,
                    role: this.form.role
                  }
                }
              })
              if(data.userCreate) {
                this.addDialog = false;
                this.$refs[form].resetFields();
                this.$message({
                  message: 'User created succesfully',
                  type: 'success',
                  center: true
                });
              }
            } catch(err) {
              console.log(err)
            }
          } else {
            return false
          }
        })     
      },
      handleDelete: async function() {
        try {
          const stateDelete = await this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'warning',
            closeOnClickModal: false
          });
          if(stateDelete === 'confirm') {
            await this.$apollo.mutate({
              mutation: USER_DELETE,
              variables: {
                input: this.multipleSelect
              },
              update: async function (store, { data: { userDelete } }) {
                const data = store.readQuery({ query: USER_ALL })
                _.pullAllBy(data.userAll, userDelete, 'id')
                store.writeQuery({ query: USER_ALL, data })
              },
              optimisticResponse: {
                __typename: 'Mutation',
                userDelete: _.differenceBy(this.userAll, this.multipleSelect, 'id')
              }
            })
          }
        } catch(err) {
          console.log(err)
        }
      },
      handleEdit (row) {
        this.editDialog = true;
        this.form.id = row.id;
        this.form.username = row.username;
        this.form.role = row.role;
      },
      handleEditSubmit: function(form) {
        this.$refs[form].validate(async (valid) => {
          if(valid) {
            try {
              const { data } = await this.$apollo.mutate({
                mutation: USER_UPDATE,
                variables: {
                  id: this.form.id,
                  username: this.form.username,
                  role: this.form.role
                },
                update: (store, { data: { userUpdate } }) => {
                  const data = store.readQuery({ query: USER_ALL })
                  const idx = _.findIndex(data.userAll, { id: userUpdate.id })
                  data.userAll[idx].username = userUpdate.username
                  data.userAll[idx].role = userUpdate.role
                  store.writeQuery({ query: USER_ALL, data })
                },
                optimisticResponse: {
                  __typename: 'Mutation',
                  userUpdate: {
                    __typename: 'User',
                    id: this.form.id,
                    username: this.form.username,
                    role: this.form.role
                  }
                }
              })
              if(data.userUpdate) {
                this.editDialog = false;
                this.$refs[form].resetFields();
                this.$message({
                  message: 'User updated succesfully',
                  type: 'success',
                  center: true
                });
              }
            } catch(err) {
              console.log(err)
            }
          } else {
            return false
          }
        })     
      },
    }
  }
</script>

<style scoped>
  .main.el-col {
    padding: 20px;
  }
  .action.el-col {
    border-left: 1px dashed #dddddd;
    height: 50vh;
    padding: 10px 20px;
  }
  .action.el-col .el-button+.el-button {
    margin-left: 0;
  }
</style>
