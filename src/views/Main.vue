<template>
  <div style="width:100%;height: 100%" class="main">
    <div  class="container" :class="{active:clicked,search:!clicked}" >
      <div class="row">
        <div class="mr-2">
          <select class="custom-select" name="il" id="il" v-model="form.cityId">
            <option>İli Seçiniz</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
          </select>
        </div>
        <div class="mr-2">
          <select class="custom-select" name="ilce" id="ilce" v-model="form.districtId">
            <option>İlçeyi Seçiniz...</option>
            <option v-for="district in filteredDistricts" :key="district.id" :value="district.id">{{ district.name }}</option>
          </select>
        </div>
        <button  class="btn btn-primary" @click="bul">Nöbetçi Eczaneyi Bul</button>
      </div>
    </div>

    <table>
      <thead v-show="params.city !==null">
      <tr>
        <th data-type="text-short">ECZANENİN ADI<span class="resize-handle"></span></th>
        <th data-type="text-short">BULUNDUĞU İLÇE<span class="resize-handle"></span></th>
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
            <b-button pill variant="success">Haritada Göster</b-button>
          </a>


        </td>
      </tr>
      </tbody>
    </table>
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
      clicked:false
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
          'authorization': 'apikey ',//Size ait api keyinizi kullanın
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
.search{
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  height: 100%;
}
.active {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  transition: margin-top 3s;
}

table {
  margin-top: 50px;
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns:
    minmax(150px, 1fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1fr)
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
  background: #6c7ae0;
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
  color: #808080;
}

tr:nth-child(even) td {
  background: #f8f6ff;
}
</style>
