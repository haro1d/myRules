<template>
  <div id="sceneCanvas">
      <!-- <img src="../assets/flower.png" alt=""> -->
  </div>
</template>
<script>

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {CSS2DRenderer,CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
// import sculpture from './sculpture.obj'
export default {
  data() {
    return {
      camera: '',
      scene: '',
    }
  },
  mounted(){
    addEventListener('dblclick', this.onMouseDblclickSprite, false);
    addEventListener('click', this.onMouseDblclickMaterial, false);
    
    // this.first()   //地球，月球
    // this.second()  //浴缸，坐标轴
    // this.third()   //方块，地面，坐标轴
    // this.fourth()  //树林
    // this.fifth()   //雨水
    this.sixth()    //随机方块阵
  },
  methods:{
    first(){
        let camera, scene, renderer, labelRenderer;
        let moon, earth;
        let clock = new THREE.Clock();
        //实例化纹理加载器
        const textureLoader = new THREE.TextureLoader()

        function init(){
            //地球和月球半径大小
            const EARTH_RADIUS = 2.5;
            const MOON_RADIUS = 0.27;

            camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,200);
            camera.position.set(10, 5, 20);

            scene = new THREE.Scene();

            const dirLight = new THREE.SpotLight(0xffffff);
            dirLight.position.set(0,0,10);
            dirLight.intensity = 1.5;
            dirLight.castShadow = true;
            scene.add(dirLight);

            const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS,16,16);
            const moonMaterial = new THREE.MeshPhongMaterial({
                map: textureLoader.load(require('../assets/logo.png'))
            })
            moon = new THREE.Mesh(moonGeometry,moonMaterial)
            scene.add(moon)

            const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS,16,16);
            const earthnMaterial = new THREE.MeshPhongMaterial({
                map: textureLoader.load(require('../assets/xxx.png')),
                // specularMap:textureLoader.load(require('../assets/logo.png')),
                // normalMap:textureLoader.load(require('../assets/flower.png'))
            })
            earth = new THREE.Mesh(earthGeometry,earthnMaterial)
            scene.add(earth)
          //渲染器
            renderer = new THREE.WebGLRenderer({
                // alpha: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth,window.innerHeight)
            renderer.shadowMap.enabled = true;
            document.body.appendChild(renderer.domElement)

            const controls = new OrbitControls(camera,renderer.domElement)
        }
        let oldTime = 0;
        function animate(){
            const elapsed = clock.getElapsedTime();
            moon.position.set(Math.sin(elapsed)*5, 0, Math.cos(elapsed)*5);

            //地球自转
            let axis = new THREE.Vector3(0, 1, 0);
            earth.rotateOnAxis(axis, (elapsed-oldTime) * Math.PI / 8);
            renderer.render(scene, camera);
            oldTime = elapsed;
            requestAnimationFrame(animate)
        }

        init()
        animate()
    },
    second(){
      let loader = new OBJLoader();
      let scene = new THREE.Scene();
      let camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,200);
      camera.position.set(100, 100, 100);
      // loader.load( '/model/1.obj', ( obj )=> {
      //     let object = obj;
          
      //     object.scale.set(3,3,3);
      //     object.children[0].material.color.set(0xe8b73b);
      //     object.rotation.x = 1;
      //     object.rotation.y = 0.3;
      //     scene.add(object);
      // });

      //地板
      var planeGeometry = new THREE.PlaneGeometry(46,40);
      var planeMaterial = new THREE.MeshBasicMaterial(  
        {color: 0xFFFFE1}
      )
      var plane = new THREE.Mesh(planeGeometry,planeMaterial)
      plane.rotation.x = -0.5*Math.PI
      plane.position.set(0, 0, 0);
      scene.add(plane)

      // x=红色, y= 绿色， z=蓝色
      var axes = new THREE.AxisHelper(200)
      scene.add(axes)

      console.log(FBXLoader);
      const textureLoader = new THREE.TextureLoader()
      let loader2 = new FBXLoader();//创建一个fbx加载器
      // let file1 = require('model/1.fbx')
      let obj1
      loader2.load('model/1.fbx',function(obj) {
          console.log(obj);//查看加载后返回的模型对象
          obj1 = obj

          obj1.children[0].material.map = textureLoader.load(require('../assets/xxx.png'))

          scene.add(obj1)
          // 适当平移fbx模型位置
          obj1.translateY(6);
          obj.scale.x = 2.4;

          let light = new THREE.PointLight(0xffffff,1.8);//光源颜色
          light.position.set(66, 30, 66);//光源位置
          scene.add(light);//光源添加到场景中

          let renderer = new THREE.WebGLRenderer();
          renderer.setSize(window.innerWidth, window.innerHeight);//设置渲染区域尺寸
          renderer.setClearColor(0xC54C01, 1); //设置背景颜色
          document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
          //执行渲染操作   指定场景、相机作为参数
          renderer.render(scene, camera);
          let T0 = new Date();//上次时间
          function render() {
                  let T1 = new Date();//本次时间
                  let t = T1-T0;//时间差
                  T0 = T1;//把本次时间赋值给上次时间
                  requestAnimationFrame(render);
                  renderer.render(scene,camera);//执行渲染操作
                  // obj1.rotation(0, 0.001*t, 0);//旋转角速度0.001弧度每毫秒
                  obj1.rotateY(0.001*t);
              }
          render();

          // 控制器
          let controls = new OrbitControls(camera,renderer.domElement)
          controls.addEventListener('change',()=>{
            renderer.render(scene,camera)
          })
        })
    },
    third(){
      var scene = new THREE.Scene();
      //地板
      var planeGeometry = new THREE.PlaneGeometry(260,220);
      var planeMaterial = new THREE.MeshStandardMaterial(  
        {color: 0xFFFCC6}
      )
      var plane = new THREE.Mesh(planeGeometry,planeMaterial)
      plane.rotation.x = -0.5*Math.PI
      plane.position.set(0, 0, 0);
      scene.add(plane)
     
      /**
       * 创建网格模型
       */
      var geometry = new THREE.BoxGeometry(100, 60, 100); //创建一个立方体几何对象Geometry
      // var material = new THREE.MeshLambertMaterial({
      //   color:0xff0000,
      //   opacity:0.7,
      //   transparent:true,
      //   // wireframe:true,    //渲染为线框
      // }); //材质对象Material
      var material=new THREE.MeshPhongMaterial({
          color:0xff0000,
          specular:0x4488ee,
          shininess:12
      });//材质对象
      var mesh1 = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      mesh1.position.set(0, 40, 0);
      mesh1.castShadow = true;
      mesh1.receiveShadow = true;
      scene.add(mesh1); //网格模型添加到场景中

      //坐标轴
      // x=红色, y= 绿色， z=蓝色
      var axes = new THREE.AxisHelper(200)
      scene.add(axes)
      /**
       * 光源设置
       */
      //点光源
      var point = new THREE.PointLight(0xb9d3ff);
      point.position.set(120, 120, -120); //点光源位置
      point.castShadow = true;
      point.angle = Math.PI / 4;
      scene.add(point); //点光源添加到场景中
    
      //环境光
      var ambient = new THREE.AmbientLight(0x444444);
      scene.add(ambient);

      /**
       * 相机设置
       */
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      camera.position.set(200, 300, 200); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      renderer.shadowMapEnabled = true;
      document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      renderer.render(scene, camera);
      let T0 = new Date();//上次时间
      function render() {
              let T1 = new Date();//本次时间
              let t = T1-T0;//时间差
              T0 = T1;//把本次时间赋值给上次时间
              requestAnimationFrame(render);
              renderer.render(scene,camera);//执行渲染操作
              mesh1.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
          }
      render();

      // 控制器
      var controls = new OrbitControls(camera,renderer.domElement)
      controls.addEventListener('change',()=>{
        renderer.render(scene,camera)
      })
    },
    fourth(){
      this.scene = new THREE.Scene();
      /**
       * 精灵创建树林效果
       */
      // 加载树纹理贴图
      var textureTree = new THREE.TextureLoader().load("img/tree.png");
      // 批量创建表示一个树的精灵模型
      for (let i = 0; i < 100; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
          map:textureTree,//设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        this.scene.add(sprite);
        // 控制精灵大小,
        sprite.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.5;
        var k2 = Math.random() - 0.5;
        // 设置精灵模型位置，在xoz平面上随机分布
        sprite.position.set(1000 * k1, 50, 1000 * k2)
      }
      /**
       * 创建一个草地地面
       */

      var planeGeometry = new THREE.PlaneGeometry(1100,1100);
      var planeMaterial = new THREE.MeshBasicMaterial(  
        {color: 0x97AE00}
      )
      var plane = new THREE.Mesh(planeGeometry,planeMaterial)
      plane.rotation.x = -0.5*Math.PI
      plane.position.set(0, 0, 0);
      this.scene.add(plane)


      // var geometry = new THREE.PlaneGeometry(1000, 1000); //矩形平面
      // // 加载草地纹理贴图
      // var texture = new THREE.TextureLoader().load("img/flower.png");
      // // 设置纹理的重复模式
      // texture.wrapS = THREE.RepeatWrapping;
      // texture.wrapT = THREE.RepeatWrapping;
      // // uv两个方向纹理重复数量
      // texture.repeat.set(10, 10);
      // var material = new THREE.MeshLambertMaterial({
      //   color: 0x777700,
      //   // map:texture,
      // });
      // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
      // scene.add(mesh); //网格模型添加到场景中
      // mesh.rotateX(-Math.PI/2);

      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      //创建相机对象
      
      var k = width / height; //窗口宽高比
      var s = 600; //三维场景显示范围控制系数，系数越大，显示的范围越大
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 4000);
      this.camera.position.set(500, 300, 100); //设置相机位置
      
      // var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      // camera.position.set(500, 200, 100);//设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0xFFF0E9, 1); //设置背景颜色
      renderer.shadowMapEnabled = true;
      document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      renderer.render(this.scene, this.camera);
      let T0 = new Date();//上次时间
      let that = this;
      function render() {
              let T1 = new Date();//本次时间
              let t = T1-T0;//时间差
              T0 = T1;//把本次时间赋值给上次时间
              requestAnimationFrame(render);
              renderer.render(that.scene,that.camera);//执行渲染操作
              // mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
          }
      render();

      // 控制器
      var controls = new OrbitControls(this.camera,renderer.domElement)
      controls.addEventListener('change',()=>{
        renderer.render(this.scene,this.camera)
      })

    },
    fifth(){
      let scene = new THREE.Scene();

      var textureTree = new THREE.TextureLoader().load("img/drop.png");
      var group = new THREE.Group();
      // 批量创建表示雨滴的精灵模型
      for (let i = 0; i < 400; i++) {
        var spriteMaterial = new THREE.SpriteMaterial({
          map:textureTree,//设置精灵纹理贴图
        });
        // 创建精灵模型对象
        var sprite = new THREE.Sprite(spriteMaterial);
        // scene.add(sprite);
        group.add(sprite);
        // 控制精灵大小,
        sprite.scale.set(8, 10, 1); //// 只需要设置x、y两个分量就可以
        var k1 = Math.random() - 0.3;
        var k2 = Math.random() - 0.3;
        var k3 = Math.random() ;
        // 设置精灵模型位置，在整个空间上上随机分布
        sprite.position.set(1000 * k1, 300 * k3, 1000 * k2)
      }

     
      scene.add(group);//雨滴群组插入场景中
      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      //创建相机对象

      var k = width / height; //窗口宽高比
      var s = 600; //三维场景显示范围控制系数，系数越大，显示的范围越大
      // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 4000);
      var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      camera.position.set(292, 109, 268);//设置相机位置
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0x000000, 1); //设置背景颜色
      renderer.shadowMapEnabled = true;
      document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      renderer.render(scene, camera);
      // 渲染函数
      function render() {
        // 每次渲染遍历雨滴群组，刷新频率30~60FPS，两帧时间间隔16.67ms~33.33ms
        // 每次渲染都会更新雨滴的位置，进而产生动画效果
        group.children.forEach(sprite => {
          // 雨滴的y坐标每次减1
          sprite.position.y -= 1;
          if (sprite.position.y < 0) {
            // 如果雨滴落到地面，重置y，从新下落
            sprite.position.y = 200;
          }
        });
        renderer.render(scene, camera); //执行渲染操作
        requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
      }
      render();

      // 控制器
      var controls = new OrbitControls(camera,renderer.domElement)
      controls.addEventListener('change',()=>{
        renderer.render(scene,camera)
      })
      // onresize 事件会在窗口被调整大小时发生
      window.onresize=function(){
        // 重置渲染器输出画布canvas尺寸
        renderer.setSize(window.innerWidth,window.innerHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = window.innerWidth/window.innerHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix ();
      };
    },
    sixth(){
      this.scene = new THREE.Scene();

      for (let i = 0; i < 20; i++) {
          let textureLoader = new THREE.TextureLoader()
          var geometry = new THREE.BoxGeometry(70, 130, 70); //创建一个立方体几何对象Geometry
          var material=new THREE.MeshPhongMaterial({
              color:0xff0000,
              specular:0x4488ee,
              shininess:12,
              map: textureLoader.load(require('../assets/xxx.png')),
          });//材质对象
          var mesh1 = new THREE.Mesh(geometry, material); //网格模型对象Mesh
          
          // mesh1.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
          var k1 = Math.random() - 0.5;
          var k2 = Math.random() - 0.5;
          mesh1.position.set(1000 * k1, 65, 1000 * k2)
          this.scene.add(mesh1); //网格模型添加到场景中
      }
      
      //地板
      var planeGeometry = new THREE.PlaneGeometry(1000,1000);
      var planeMaterial = new THREE.MeshStandardMaterial(  
        {color: 0xFFFCC6}
      )
      var plane = new THREE.Mesh(planeGeometry,planeMaterial)
      plane.rotation.x = -0.5*Math.PI
      plane.position.set(0, 0, 0);
      this.scene.add(plane)

      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度

      // var axes = new THREE.AxisHelper(1200)
      // this.scene.add(axes)
      //点光源
      var point = new THREE.PointLight(0xb9d3ff);
      point.position.set(1200, 20, 1200); //点光源位置
      point.castShadow = true;
      this.scene.add(point); //点光源添加到场景中
    
      //环境光
      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);

      //创建相机对象
      
      var k = width / height; //窗口宽高比
      var s = 700; //三维场景显示范围控制系数，系数越大，显示的范围越大
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 4000);
      this.camera.position.set(1200, 700, 1300); //设置相机位置
      
      // var camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
      // camera.position.set(500, 200, 100);//设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0xFFF0E9, 1); //设置背景颜色
      renderer.shadowMapEnabled = true;
      document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      renderer.render(this.scene, this.camera);
      let T0 = new Date();//上次时间
      let that = this;
      function render() {
              let T1 = new Date();//本次时间
              let t = T1-T0;//时间差
              T0 = T1;//把本次时间赋值给上次时间
              requestAnimationFrame(render);
              renderer.render(that.scene,that.camera);//执行渲染操作
              // mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
          }
      render();

      // 控制器
      var controls = new OrbitControls(this.camera,renderer.domElement)
      controls.addEventListener('change',()=>{
        renderer.render(this.scene,this.camera)
      })

    },
    onMouseDblclickSprite(event) {
        // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
        var intersects = this.getIntersects(event);
        console.log('intersects',intersects);
        if (intersects.length != 0 && intersects[0].object instanceof THREE.Sprite) {
            let selectObject = intersects[0].object;
            this.changeSprite(selectObject);
        } else {
            console.log("未选中 Mesh!");
        }
    },
    onMouseDblclickMaterial(event) {
        // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
        console.log("event",event);
        var intersects = this.getIntersects(event);
        console.log('intersects',intersects);
        if (intersects.length != 0 && intersects[0].object instanceof THREE.Mesh) {
          if(intersects[0].object.geometry instanceof THREE.BoxGeometry){
            let selectObject = intersects[0].object;
            this.changeMaterial(selectObject);

          }
          else {
            console.log("未选中 Mesh!");
          } 
        } else {
            console.log("未选中 Mesh!");
        }
    },
    // 获取与射线相交的对象数组
    getIntersects(event) {
        event.preventDefault();
 
        // 声明 raycaster 和 mouse 变量
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
 
        // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        console.log("event.clientX",event.clientX);
        console.log("window.innerWidth",window.innerWidth);
        console.log("mouse.x",mouse.x);
        console.log("event.clientY",event.clientY);
        console.log("window.innerHeight",window.innerHeight);
        console.log("mouse.y",mouse.y);
        //通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
        raycaster.setFromCamera(mouse, this.camera);
        console.log('raycaster',raycaster)
        // 获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
        var intersects = raycaster.intersectObjects(this.scene.children);
 
        //返回选中的对象
        return intersects;
    },
    // 改变对象材质属性
    changeSprite(object) {
        var textureTree = new THREE.TextureLoader().load("img/redTree.png");
        var spriteMaterial = new THREE.SpriteMaterial({
          map:textureTree,//设置精灵纹理贴图
        });
        object.material = spriteMaterial;
    },
    // 改变对象材质属性
    changeMaterial(object) {
        const textureLoader = new THREE.TextureLoader()

        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff * Math.random(),
            transparent: object.material.transparent ? false : true,
            opacity: 1,
            map: textureLoader.load(require('../assets/xxx.png')),
        });
        object.material = material;
    },

 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
