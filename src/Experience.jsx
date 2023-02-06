import {OrbitControls, TransformControls, PivotControls, Html, Text, Float, MeshReflectorMaterial} from '@react-three/drei'
import {useRef} from 'react'

export default function Experience()
{
    const cubeRef = useRef()
    const sphereRef = useRef()

    /*
        TransformControls
            makeDefault = stop the camera moving when using the gyzmo

        PivotControls
            depthTest = draw the controller behind objects so we can always see it
            fixed = makes the gizmo orthogonal

        Html
            wrapperClass = makes the html targetable with css using this class, [BEWARE] the html element is inside a nested div
            center = changes the pivot point to the center of the html tag
            distanceFactor = prevent the text from being too big when zooming
            occlude = the html disapear if one of the ref objects are in front of it

        Text
            It is possible to use materials with the font

        Float
            make things to float around

        MeshReflectorMaterial
            does not work with non planar meshes
            blur = define a blur value
            mixBlur = if 1 the reflector will be blured, if 0 no blur will be applied
    */
    return <>
        <OrbitControls makeDefault />

        <directionalLight position={[1, 2, 3]} intensity={1.5}/>
        <ambientLight intensity={0.5}/>

        <PivotControls
            anchor={[0, 0, 0]}
            depthTest={false}
            lineWidth={1}
            axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
            scale={100}
            fixed={true}
        >
            <mesh ref={sphereRef} position-x={-2}>
                <sphereGeometry/>
                <meshStandardMaterial color="orange"/>
                <Html
                    position={[1, 1, 0]}
                    wrapperClass="label"
                    center
                    distanceFactor={6}
                    occlude={[sphereRef, cubeRef]}
                >That's a sphere</Html>
            </mesh>
        </PivotControls>

        <mesh ref={cubeRef} position-x={2} scale={1.5}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple"/>
        </mesh>

        <TransformControls mode="translate" object={cubeRef}/>

        <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
            <planeGeometry />
            {/*<meshStandardMaterial color="greenyellow"/>*/}
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={1}
                mirror={0.8}
                color="greenyellow"
            />
        </mesh>

        <Float
            speed={5}
            floatIntensity={2}
        >
            <Text
                font="./poppins-v20-latin-regular.woff"
                fontSize={1}
                color="salmon"
                position={[0, 3, 0]}
                maxWidth={3}
                textAlign="center"
            >
                I love R3F
                <meshNormalMaterial />
            </Text>
        </Float>
    </>
}