<template>
  <div id="app">
    <div class="spa">
      <p class="spa__header">SPA</p>
      <div class="spa__content">
        <div class="spa__window">
          <p class="spa__choice">{{selectChoice}}</p>
          <div class="spa__selected">
            <select class="spa__select" v-if="currentSelect === 0" @change="selectСolumn($event)">
              <option selected>Выберите колонку в таблице</option>
              <option value="Название">Название</option>
              <option value="Количество">Количество</option>
              <option value="Расстояние">Расстояние</option>
            </select>
          </div>
          <select class="spa__select" v-if="currentSelect === 1" @change="selectCondition">
            <option selected>Выберите условие в таблице</option>
            <option value="=">Равно</option>
            <option value="Содержит">Содержит</option>
            <option value=">">Больше</option>
            <option value="<">Меньше</option>
          </select>
          <input v-if="currentSelect === 2" class="spa__input" type="text" placeholder="Текст для фильтрации" v-model="inputType">
          <button class="spa__reset" @click="reset">Сбросить</button>
        </div>
          <table class="table" cellspacing="0">
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Количество</th>
              <th>Расстояние</th>
            </tr>
            <tr v-for="(item, index) in pages" :key="index">
              <td>{{item.data}}</td>
              <td>{{item.city}}</td>
              <td>{{item.steps}}</td>
              <td>{{item.distance}}</td>
            </tr>
          </table>
          <div class="table__paginagiton" v-if="mainArray.length > 0">
            <div class="table__prev">
              <button type="button" @click="prev"><img class="table__prev_img" src="./assets/table/prev.svg"></button>
            </div>
            <div class="table__buttons">
              <button v-for="starts in listToStart" :key="starts" @click="addButtons(starts)"
                :class="{activeButton : currentPage === starts}">{{ starts }}
              </button>
            </div>
            <div class="table__prev">
              <button type="button" @click="next"><img class="table__prev_img" src="./assets/table/next.svg"></button>
            </div>
          </div>
          <p class="table__wrong" v-else>Ничего не найдено</p>
       
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      selectChoice:'Выберите колонку в таблице',
      currentSelect:0,
      startIndex: 0,
      endIndex: 4,
      currentPage: 1,
      inputType: '',
      mainArray:[],
      currentColumn:'',
      currentСondition:''
    }
  },
  methods:{
    reset(){
      this.selectChoice = 'Выберите колонку в таблице'
      this.currentColumn = ''
      this.currentСondition = ''
      this.currentSelect = 0
    },
    selectСolumn(e){
     if(e.target.value === 'Название') {
       this.currentColumn = e.target.value
       this.currentSelect = 2
       this.selectChoice = 'Впишите текст для филтрации'
     }
     else {
    
       this.currentColumn = e.target.value
       this.currentSelect = 1
       this.selectChoice = 'Выберите условие в таблице'
     }
    },
    selectCondition(e){
      this.currentSelect = 2
      this.currentСondition = e.target.value
      this.selectChoice = 'Впишите текст для филтрации'
    },
    next() {
      if (this.endIndex < this.mainArray.length) {
        this.startIndex += 4
        this.endIndex += 4
        this.currentPage += 1
      }
    },
    prev() {
      if (this.startIndex > 0) {
        this.startIndex -= 4
        this.endIndex -= 4
        this.currentPage -= 1
      }
    },
    addButtons(starts) {
      this.startIndex = (starts - 1) * 4
      this.endIndex = starts * 4
      this.currentPage = starts
    }
  },
  computed:{
    ...mapGetters(['allList']),
    quantity() {
      return this.quantity = this.allList.length
    },
    pages() {
      this.mainArray = this.allList
      if(this.currentColumn === 'Название') {
        let array = this.mainArray.filter(item => {
          return item.city.toUpperCase().indexOf(this.inputType.toUpperCase()) !== -1
        }) 
        this.mainArray = array
        if(this.mainArray.length <= 0) {
          return this.mainArray = []
        }
        else {
          return this.mainArray.slice(this.startIndex,this.endIndex)
        }
      }
      else if(this.currentColumn === 'Количество') {
        if (this.currentСondition === '=') {
          let num = parseInt(this.inputType)
          let array = this.mainArray.filter(item => {
            return item.steps === num
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
        else if (this.currentСondition === 'Содержит') {
          let array = this.mainArray.filter(item => {
            return String(item.steps).indexOf(this.inputType) !== -1
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
        else if (this.currentСondition === '>') {
          let num = parseInt(this.inputType)
          let array = this.mainArray.filter(item => {
            return item.steps > num
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
        else if (this.currentСondition === '<') {
          let num = parseInt(this.inputType)
          let array = this.mainArray.filter(item => {
            return item.steps < num
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
      }
      else if (this.currentColumn === 'Расстояние') {
        if (this.currentСondition === '=') {
          let num = parseInt(this.inputType)
          let array = this.mainArray.filter(item => {
            return item.distance === num
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
        else if (this.currentСondition === 'Содержит') {
          let array = this.mainArray.filter(item => {
            return String(item.distance).indexOf(this.inputType) !== -1
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
        else if (this.currentСondition === '>') {
          let num = parseInt(this.inputType)
          let array = this.mainArray.filter(item => {
            return item.distance > num
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
        else if (this.currentСondition === '<') {
          let num = parseInt(this.inputType)
          let array = this.mainArray.filter(item => {
            return item.distance < num
          })
          this.mainArray = array
          if (this.mainArray.length <= 0) {
            return this.mainArray = []
          }
          else {
            return this.mainArray.slice(this.startIndex, this.endIndex)
          }
        }
      }
      else {
        return this.mainArray.slice(this.startIndex,this.endIndex)
      }
    },
    pagesToStart() {
      return Math.ceil(this.allList.length / 8)
    },
    listToStart() {
      if (this.pagesToStart <= 5) {
        let array = []
        for (let i = 1; i <= this.pagesToStart; i++) {
          array.push(i)
        }
        return array
      } else if (this.currentPage > 2 && this.currentPage <= this.pagesToStart - 2) {
        let array = []
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          array.push(i)
        }
        return array
      } else if (this.currentPage < 3) {
        return [1, 2, 3, 4, 5]
      } else {
        let array = []
        for (let i = this.pagesToStart - 4; i <= this.pagesToStart; i++) {
          array.push(i)
        }
        return array
      }
    },
    lastIndex() {
      if (this.pages.length < 4) {
        return this.startIndex + this.pages.length
      } else {
        return this.endIndex
      }
    }
  },
  mounted(){
    this.$store.dispatch('getList')
  }

}
</script>

<style>
* {
  margin: 0;
}
.spa__reset {
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
}
.spa {
  background: #1C1F37;
  height: 100vh;
  width: 100%;
}
.spa__header {
  padding: 50px;
  color:#fff;
  font-weight: 500;
  font-size: 60px;
}
.spa__content {
  margin: 0 auto;
  max-width: 1100px;
}
.spa__window {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.spa__choice {
  font-size: 30px;
  color:#fff;
  width: 700px;
}
.spa__selected {
  display: flex;
  align-items: center;
}
.spa__select {
  padding: 10px;
  outline: none;
  width: 260px;
}
.spa__input {
  padding: 10px;
  outline: none;
  width: 250px;
}
.table {
  width: 100%;
  background: #Fff;
}
.table th {
  text-align: start;
  border-bottom: 1px solid;
  padding: 10px 10px;
  font-size: 20px;
}
.table td {
    text-align: start;
    border-bottom: 1px solid;
    padding: 10px 10px;
    font-size: 20px;
}
.table__paginagiton {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 35px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.table__prev {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.table__close {
  cursor: pointer;
}

.table__prev button {
  border: 1px solid #1E1E1E;
  background: #fff;
  width: 37px;
  height: 37px;
  border-radius: 100%;
  outline: none;
  transition: all 0.1s ease;
  cursor: pointer;
}

.table__prev_img {
  margin-top: 2px;
  margin-right: 1px;

}

.table__prev button:hover {
  transform: scale(0.98);
}

.table__buttons button {
  font-size: 14px;
  border: 1px solid #1E1E1E;
  color: #1E1E1E;
  margin: 0 2px;
  border-radius: 100%;
  width: 37px;
  height: 37px;
  background: #ffffff;
  font-weight: 500;
  outline: none;
  transition: all 0.1s ease;
  cursor: pointer;
}

.table__buttons button:hover {
  transform: scale(0.98);
}

.activeButton {
  color: #1E1E1E !important;
  background: #FFF !important;
  font-weight: 700 !important;
}
.table__wrong {
  text-align: center;
  margin-top: 30px;
  font-size: 50px;
  color:#fff;
}
</style>
