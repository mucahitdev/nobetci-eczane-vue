<template>
  <div style="width:100%;height: 100%" class="main">
    <div  class="container" :class="{active:clicked,search:!clicked}" >
      <div class="row">
        <div class="mr-2">
          <select class="custom-select slc1" name="il" id="il" v-model="form.cityId">
            <option disabled :value="null">İli seç</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
          </select>
        </div>
        <div class="mr-2">
          <select class="custom-select slc2" name="ilce" id="ilce" v-model="form.districtId">
            <option disabled :value="null">İlçeyi seç</option>
            <option v-for="district in filteredDistricts" :key="district.id" :value="district.id">{{ district.name }}</option>
          </select>
        </div>
        <button  class="btn btn-secondary" @click="bul">Nöbetçi Eczaneyi Bul</button>
      </div>
    </div>

<!--    <table v-show="false"> ////////    Kullanılabilir
      <thead v-show="false">//params.city !==null
      <tr>
        <th  data-type="text-short">ECZANENİN ADI<span class="resize-handle"></span></th>
        <th  data-type="text-short">BULUNDUĞU İLÇE<span class="resize-handle"></span></th>
        <th data-type="numeric">TELEFON NUMARASI<span class="resize-handle"></span></th>
        <th data-type="text-short">ADRESİ<span class="resize-handle"></span></th>
        <th data-type="text-short">KONUM<span class="resize-handle"></span></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,key) in items" :key="key">
        <td>{{ item.name }}</td>
        <td>{{ item.dist }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.address }}</td>
        <td>
          <a :href="mapUrl(item.loc)" target="_blank">
            <b-button pill variant="secondary">Haritada Göster</b-button>
          </a>
        </td>
      </tr>
      </tbody>
    </table>-->

    <div v-show="params.city !==null" class="accordion" role="tablist">
      <b-card no-body class="mb-1" v-for="(item,key) in items" :key="key">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="info">{{ item.name }}</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-card-text>{{ item.dist }}</b-card-text>
            <b-card-text>{{ item.address }}</b-card-text>
            <b-card-text>{{ item.phone }}</b-card-text>
            <a :href="mapUrl(item.loc)" target="_blank">
              <b-button pill variant="secondary">Haritada Göster</b-button>
            </a>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>





  </div>
</template>

<script>
import axios from "axios";
import cities from "../il"
import districts from "../ilce"
export default {

  data() {
    return {
      items: [],
      cities: cities,
      districts: districts,
      form: {
        cityId: null,
        districtId: null
      },
      params:{
        district:null,
        city:null

      },
      clicked:false,
      apiKey:"apikey 1IqfcgubrjtY9FFQQHnxnr:2DFKqKfLYgyXRXHxNNiuJ9"//Size ait api keyinizi kullanın
    }
  },
  methods: {

    bul() {
      this.clicked=true;
      if(this.form.cityId!==null){
        this.params.city = cities.find(item => item.id === this.form.cityId).name
      }
      if(this.form.districtId!==null){
        this.params.district = districts.find(item => item.id === this.form.districtId).name
      }
      let options = {
        method: 'GET',
        url: 'https://api.collectapi.com/health/dutyPharmacy',
        params: {il:this.params.city , ilce: this.params.district},
        headers: {
          'authorization': this.apiKey,
          "content-type": "application/json"
        }
      };
      axios.request(options).then((response) => {
        this.items = response.data.result
        console.log(this.items)
      }).catch((error) => {
        console.error(error);
      });
    },
    mapUrl(e) {
      return `https://www.google.com/maps?daddr=${e}`;
    }
  },
  computed: {
    filteredDistricts() {
      if (this.cityId !== null){
        return this.districts.filter(ilce => ilce.il_id === this.form.cityId)
      } else {
        return []
      }
    }
  }
}


</script>
<style scoped>
* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.main{
  background: url("https://images.pexels.com/photos/1484759/pexels-photo-1484759.jpeg?cs=srgb&dl=pexels-steve-johnson-1484759.jpg&fm=jpg") no-repeat fixed;
  background-size: cover;
}
.slc1{
  margin: 0 30px 10px;
  @media (--t) {
  margin: 0;
  }
}
.slc2{
  margin: 0 50px;
  max-width: 205px;
  @media (--t) {
    margin: 0;
  }
}
.search{
  padding-top: 70%;
  padding-left: 15%;
  @media (--t) {
    padding-top: 0;
    padding-left:0;
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100%;
  }
}
.active {
  display: table-column;
  @media (--t) {
    color: #0389bc;
    padding-top: 50px;
    display: flex;
    justify-content: center;
    transition: padding-top 3s;
  }
}
.btn-secondary{
  margin-top: 23px;
  margin-left: 18%;
  @media (--t) {
    margin-top: 0;
    margin-left: 0;
  }
}

table {
  margin-top: 0;
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns:
    minmax(150px, 1fr)

    minmax(150px, 1fr);
  @media (--t) {
    margin-top: 50px;
    display: grid;
    border-collapse: collapse;
    min-width: 100%;
    grid-template-columns:
    minmax(150px, 1fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1fr);

  }

}
thead{
  display: none;
}

thead,
tbody,
tr {
  display: contents;
}

th,
td {
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th {
  position: sticky;
  top: 0;
  background: #0389bc;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
  position: relative;
}

th:last-child {
  border: 0;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0;
  width: 3px;
  cursor: col-resize;
}

.resize-handle:hover,
  /* The following selector is needed so the handle is visible during resize even if the mouse isn't over the handle anymore */
.header--being-resized .resize-handle {
  opacity: 0.5;
}

th:hover .resize-handle {
  opacity: 0.3;
}

td {
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 600;
  color: black;
  background: inherit;
}

tr:nth-child(even) td {
  background: inherit;
}
</style>
