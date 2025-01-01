import { SiAwslambda } from "react-icons/si";
import { CgFileDocument } from "react-icons/cg";
import { AiOutlineBlock } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const Implementation = () => {
  return (
    <>
      <img
        src="../src/assets/4-implementation/4.overall-architecture.png"
        alt="overall architecture"
      />
      <article id="implementation-1">
        <h2>Implementation 1</h2>
        <div className="flex flex-row space-x-4">
          <div className="flex-[25]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              malesuada dui non augue aliquet, vel iaculis arcu pharetra. Nullam
              tristique tortor eu sapien convallis, et euismod ligula iaculis.
            </p>
            <p>
              Curabitur vehicula erat at ante fermentum, in condimentum nisi
              condimentum. Sed viverra nisl sit amet nibh sodales, eget
              facilisis lorem feugiat. Donec vel eros ut urna faucibus maximus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              voluptatibus modi quam amet repudiandae quos molestias
              reprehenderit optio itaque ullam quisquam vitae totam aut
              laboriosam, saepe est corrupti voluptatem sunt.
            </p>
          </div>
          <img
            className="max-h-lg m-0 max-w-lg flex-[75] object-contain"
            src="../src/assets/4-implementation/4.1.isolated-vpc-in-users-aws-account.png"
            alt="Isolated VPC in user's AWS account"
          />
        </div>

        <ul className="m-0 flex flex-row justify-start space-x-4 p-0">
          <li
            id="private-versus-public-subnets"
            className="max-w-1/2 hover:bg-septenary/50 m-0 inline-block rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:text-tertiary hover:shadow-sm"
          >
            <Dialog>
              <DialogTrigger className="m-0 flex flex-row items-center space-x-2 p-4">
                <CgFileDocument size="28" className="text-primary" />
                <span>Public Versus Private Subnets</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle asChild>
                    <h2>Public Versus Private Subnets</h2>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="rounded-md border-gray-400 bg-gray-400/10 p-4">
                      <p className="prose m-0 text-gray-200">
                        Harrier sets up a VPC, which includes a{" "}
                        <span className="font-bold text-secondary">
                          public subnet
                        </span>{" "}
                        and an{" "}
                        <span className="font-bold text-secondary">
                          internet gateway
                        </span>
                        , within the user's AWS account. The{" "}
                        <span>internet gateway</span> allows internet access for
                        the EC2s. Traffic from the internet gateway is routed to
                        the public subnet using the routes in the routing table.
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Corporis, expedita nisi assumenda aspernatur
                        commodi dignissimos incidunt cumque rerum veniam
                        explicabo qui voluptas ratione libero perferendis id.
                        Ipsam iusto necessitatibus non!
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link
                    to="https://ui.shadcn.com/docs/components/dialog"
                    className="flex flex-row text-gray-200 hover:text-primary hover:underline"
                  >
                    <span>learn more</span>
                    {/* <FaExternalLinkSquareAlt className="ml-2" size="18" /> */}
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
          <li
            id="eni-for-lambdas"
            className="max-w-1/2 hover:bg-septenary/50 m-0 inline-block rounded-full border-[0.1rem] border-gray-200 p-0 text-gray-600 hover:border-gray-300 hover:text-tertiary hover:shadow-sm"
          >
            <Dialog>
              <DialogTrigger className="m-0 flex flex-row items-center space-x-2 p-4">
                <SiAwslambda size="28" className="text-senary" />
                <span>ENI for Lambdas</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle asChild>
                    <h2 className="text-quaternary/85">ENI for Lambdas</h2>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="rounded-md border-gray-400 bg-gray-400/10 p-4">
                      <p className="prose m-0 text-gray-200">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eos velit error commodi magnam officia, minus
                        laboriosam voluptatem{" "}
                        <span className="font-bold text-secondary">
                          exercitation
                        </span>{" "}
                        em nemo accusantium, laudantium voluptas nobis dolorem
                        hic nisi facilis expedita totam sint.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link
                    to="https://ui.shadcn.com/docs/components/dialog"
                    className="flex flex-row text-gray-200 hover:text-primary hover:underline"
                  >
                    <span>learn more</span>
                    {/* <FaExternalLinkSquareAlt className="ml-2" size="18" /> */}
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
          <li
            id="cidr-blocks"
            className="max-w-1/2 border-lg prose m-0 inline-block rounded-full bg-tertiary p-0 text-white"
          >
            <Dialog>
              <DialogTrigger className="m-0 flex flex-row items-center space-x-2 p-4">
                <AiOutlineBlock size="28" className="text-secondary" />
                <span>ENI for Lambdas</span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle asChild>
                    <h2 className="text-quaternary/85">CIDR Blocks</h2>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div className="rounded-md border-gray-400 bg-gray-400/10 p-4">
                      <p className="prose m-0 text-gray-200">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Eos velit error commodi magnam officia, minus
                        laboriosam voluptatem{" "}
                        <span className="font-bold text-secondary">
                          exercitation
                        </span>{" "}
                        em nemo accusantium, laudantium voluptas nobis dolorem
                        hic nisi facilis expedita totam sint.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link
                    to="https://ui.shadcn.com/docs/components/dialog"
                    className="flex flex-row text-gray-200 hover:text-primary hover:underline"
                  >
                    <span>learn more</span>
                    {/* <FaExternalLinkSquareAlt className="ml-2" size="18" /> */}
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
        </ul>
      </article>

      <article id="implementation-2">
        <h2>Implementation 2</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vehicula, arcu ut facilisis vehicula, urna felis vehicula purus, eget
          varius odio risus vel lorem. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia curae; Nulla facilisi.
        </p>
        <p>
          Vivamus sollicitudin orci eu est gravida, at iaculis risus
          condimentum. Etiam aliquam dui vel augue dapibus, vel aliquam ligula
          convallis. Morbi euismod odio nec orci feugiat, vel vehicula ligula
          volutpat.
        </p>
      </article>

      <article id="implementation-3">
        <h2>Implementation 3</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla
          augue sit amet ipsum blandit, a mollis purus elementum. In condimentum
          sapien vitae magna vehicula, sit amet lacinia ipsum tristique.
        </p>
        <p>
          Donec vel ligula ante. Fusce quis nisl ac turpis feugiat eleifend sit
          amet sit amet velit. Integer vestibulum, elit in fringilla faucibus,
          eros arcu vulputate urna, eget sollicitudin libero mi vel ante.
        </p>
      </article>

      <article id="implementation-4">
        <h2>Implementation 4</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          scelerisque nibh in sem efficitur, id bibendum ligula sodales. Donec
          vitae ante sapien. Sed in tortor at lectus dapibus malesuada.
        </p>
        <p>
          Aliquam erat volutpat. Nullam vel velit urna. Nunc hendrerit massa at
          risus aliquam, vel malesuada orci dictum. Ut tincidunt ipsum non nulla
          varius, sit amet maximus lorem vulputate.
        </p>
      </article>

      <article id="implementation-5">
        <h2>Implementation 5</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          faucibus ligula orci, vel malesuada purus sollicitudin eu. Mauris
          dapibus, libero non convallis porttitor, augue libero vulputate odio,
          in luctus metus lectus id lorem.
        </p>
        <p>
          Etiam ac lorem ac nunc feugiat gravida. Suspendisse potenti. Vivamus
          vel ante massa. Phasellus sollicitudin magna sed dui vestibulum
          vehicula.
        </p>
      </article>

      <article id="implementation-6">
        <h2>Implementation 6</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          facilisi. Aenean fringilla interdum nunc, et interdum nisi feugiat
          nec. Sed fringilla urna quis lorem varius, ac auctor lorem laoreet.
        </p>
        <p>
          Fusce interdum ligula sit amet volutpat consequat. Integer at augue ac
          justo posuere gravida. Aliquam feugiat odio et felis elementum, sed
          hendrerit ipsum elementum. Nulla sed tempus sem, vel feugiat justo.
        </p>
      </article>

      <article id="implementation-7">
        <h2>Implementation 7</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          nec tortor id ligula accumsan auctor at eu nisl. Phasellus tempor,
          erat et facilisis aliquet, sapien orci gravida ipsum, eu interdum
          lorem augue ac nisi.
        </p>
        <p>
          Nullam scelerisque nibh ut augue sollicitudin, non placerat neque
          suscipit. Nam eget lacus in metus ullamcorper interdum. Morbi
          pellentesque ante sit amet risus malesuada, ac faucibus ante varius.
        </p>
      </article>

      <article id="implementation-8">
        <h2>Implementation 8</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum
          nunc eget leo pharetra, non lobortis sem auctor. Nam ultricies est vel
          sapien convallis vehicula. Ut vulputate, odio sit amet viverra
          ullamcorper, purus lacus feugiat leo, vel convallis sapien odio eget
          orci.
        </p>
        <p>
          Aliquam nec nisl non mi luctus tincidunt. Sed sollicitudin eros vel
          sapien aliquet, et gravida lorem auctor. Nam et lectus a turpis
          sollicitudin tempor.
        </p>
      </article>

      <article id="implementation-9">
        <h2>Implementation 9</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus
          eros ac quam tempor, ut varius erat gravida. Aliquam eget tortor at
          nisi vulputate convallis. In hac habitasse platea dictumst.
          Pellentesque auctor libero in est malesuada, at congue lorem
          efficitur.
        </p>
        <p>
          Nulla facilisi. Cras feugiat, enim sit amet vehicula efficitur, turpis
          est sodales ligula, eget venenatis ipsum sapien vel libero. Mauris
          posuere arcu in justo suscipit suscipit.
        </p>
      </article>

      <article id="implementation-10">
        <h2>Implementation 10</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          gravida est non risus facilisis, ac convallis nulla condimentum. Nulla
          vel vulputate ex. Vivamus aliquam ligula ut felis vulputate, non
          dictum ligula pretium.
        </p>
        <p>
          Vestibulum malesuada lorem ut sapien ultricies, id placerat elit
          malesuada. Sed pharetra orci in nibh posuere, at lobortis magna
          vehicula. Aliquam erat volutpat. Curabitur tristique, ligula sed
          vehicula egestas, lorem urna gravida nunc, ut viverra ligula felis
          eget erat.
        </p>
      </article>
    </>
  );
};
export default Implementation;
